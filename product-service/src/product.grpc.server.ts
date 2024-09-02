import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product-service.service';
import {
  GetProductRequest,
  GetProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  Product,
} from './interfaces/product.interface';
import { ObjectId } from 'mongodb';

@Controller()
export class ProductGrpcController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'GetProduct')
  async getProduct(data: GetProductRequest): Promise<GetProductResponse> {
    const product: Product = (await this.productService.getProduct(
      data.id,
    )) as unknown as Product;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      ownerId: product.ownerId,
    };
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(
    data: UpdateProductRequest,
  ): Promise<UpdateProductResponse> {
    const updatedProduct: Product = (await this.productService.updateProduct(
      data.id,
      {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        ownerId: new ObjectId(data.ownerId),
      },
    )) as unknown as Product;
    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      ownerId: updatedProduct.ownerId,
    };
  }
}
