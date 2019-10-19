import { Controller, Get, Param, Put, Body, Post, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll() {
    return await this.productService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  @Post()
  async insertOne(@Body() product: ProductDto) {
    return await this.productService.insertOne(product);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() product: ProductDto) {
    return await this.productService.updateById(id, product);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.productService.deleteById(id);
  }
}
