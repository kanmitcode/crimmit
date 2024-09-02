import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly ownerService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.ownerService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.ownerService.getProduct(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.ownerService.updateProduct(id, updateProductDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.ownerService.getAllProducts();
  }
}
