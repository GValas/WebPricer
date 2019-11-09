import { Controller, Get, Param, Put, Body, Post, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './product-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { Roles } from '../utils/decorators/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findOne(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async insertOne(@Body() product: ProductCreateDto) {
    return await this.productService.insertOne(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async updateOne(@Param('id') id: string, @Body() product: ProductCreateDto) {
    return await this.productService.updateById(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async deleteOne(@Param('id') id: string) {
    return await this.productService.deleteById(id);
  }
}
