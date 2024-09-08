import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientGrpc } from '@nestjs/microservices';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import {
  ProductServiceClient,
  ProductDetail,
} from './interfaces/product.interface';

@Injectable()
export class OrderService {
  private productServiceClient: ProductServiceClient;
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc,
  ) {
    this.productServiceClient =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    createOrderDto.orderId = (
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    ).toString();
    const order = new this.orderModel(createOrderDto);
    const productIdsAsStrings = createOrderDto.productIds.map((id) =>
      id.toString(),
    );

    const productDetails =
      await this.fetchProductDetailsFromService(productIdsAsStrings);
    order.totalPrice = this.calculateTotalPrice(
      productDetails,
      createOrderDto.quantities,
    );

    return order.save();
  }

  private async fetchProductDetailsFromService(
    productIds: string[],
  ): Promise<ProductDetail[]> {
    // Check the cache first
    const cachedDetails = await this.cacheManager.get<ProductDetail[]>(
      `product-details-${productIds.join(',')}`,
    );
    if (cachedDetails) return cachedDetails;

    if (!this.productServiceClient) {
      throw new Error('ProductServiceClient is not initialized.');
    }

    try {
      const products = await Promise.all(
        productIds.map(async (id) => {
          try {
            const response = await this.productServiceClient!.GetProduct({
              id,
            }).toPromise();

            console.log('response from product service:', response);

            // Check if response is undefined and handle it
            if (!response) {
              throw new NotFoundException(`Product with ID ${id} not found`);
            }

            // Ensure price is properly parsed to a number
            const price = parseFloat(response.price);
            if (isNaN(price)) {
              throw new Error(`Invalid price format for product ID ${id}`);
            }

            return {
              id: response.id,
              price,
            };
          } catch (error) {
            // Log the error for debugging purposes
            console.error(`Error fetching product with ID ${id}:`, error);
            // Throw or handle the error accordingly; for now, we rethrow it
            throw new NotFoundException(
              `Failed to fetch product with ID ${id}`,
            );
          }
        }),
      );

      // Cache the fetched product details
      await this.cacheManager.set(
        `product-details-${productIds.join(',')}`,
        products,
        600,
      );
      return products;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw new NotFoundException(
        'Failed to fetch product details from product-service',
      );
    }
  }

  private calculateTotalPrice(
    productDetails: ProductDetail[],
    quantities: number[],
  ): number {
    return productDetails.reduce(
      (total, product, index) => total + product.price * quantities[index],
      0,
    );
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const existingOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const productIdsAsStrings = updateOrderDto.productIds?.map((id) =>
      id.toString(),
    );
    if (productIdsAsStrings) {
      await this.invalidateProductCache(productIdsAsStrings);
    }

    return existingOrder;
  }

  private async invalidateProductCache(productIds: string[]): Promise<void> {
    await this.cacheManager.del(`product-details-${productIds.join(',')}`);
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}
