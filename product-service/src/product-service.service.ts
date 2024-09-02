import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Emit an event to RabbitMQ when the product profile is updated
    this.amqpConnection.publish('product-exchange', 'product.update', {
      productId: id,
      ...updateProductDto,
    });

    return updatedProduct;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  @RabbitSubscribe({
    exchange: 'owner-exchange',
    routingKey: 'owner.update',
    queue: 'products-service-queue',
  })
  async handleOwnerUpdateEvent(message: any) {
    const { ownerId, ...ownerDetails } = message;
    await this.productModel.updateMany({ ownerId }, { $set: { ownerDetails } });
    console.log(`Updated products for owner: ${ownerId}`);
  }
}
