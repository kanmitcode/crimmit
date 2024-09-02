import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

interface ProductDetail {
  id: string;
  price: number;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.orderModel(createOrderDto);

    const productIdsAsStrings = createOrderDto.productIds.map((id) =>
      id.toString(),
    );

    const productDetails = await this.getProductDetails(productIdsAsStrings);
    order.totalPrice = this.calculateTotalPrice(
      productDetails,
      createOrderDto.quantities,
    );
    return order.save();
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

  private async getProductDetails(
    productIds: string[],
  ): Promise<ProductDetail[]> {
    // ProductDetail[] type for cached details
    const cachedDetails = await this.cacheManager.get<ProductDetail[]>(
      `product-details-${productIds.join(',')}`,
    );
    if (cachedDetails && Array.isArray(cachedDetails)) {
      return cachedDetails;
    }

    const productDetails =
      await this.fetchProductDetailsFromService(productIds);
    await this.cacheManager.set(
      `product-details-${productIds.join(',')}`,
      productDetails,
      600,
    );
    return productDetails;
  }

  private async invalidateProductCache(productIds: string[]): Promise<void> {
    await this.cacheManager.del(`product-details-${productIds.join(',')}`);
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

  private async fetchProductDetailsFromService(
    productIds: string[],
  ): Promise<ProductDetail[]> {
    return productIds.map((id) => ({ id, price: 100 })); // Mock response
  }
}
