import { Controller, Get, Param, Put, Body, Post, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product-dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Post()
  async insertOne(@Body() product: CreateProductDto) {
    return await this.productService.insertOne(product);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() product: CreateProductDto) {
    return await this.productService.updateById(id, product);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.productService.deleteById(id);
  }
}
