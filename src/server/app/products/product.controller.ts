import { Controller, Get, Param, Put, Body, Post, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './product-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { Roles } from '../utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('random/:nb')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async generateRandom(@Param('nb') nb: string) {
    const size = nb ? Number(nb) : 10;
    return await this.productService.generateRandom(size);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findOne(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async insert(@Body() product: ProductCreateDto | ProductCreateDto[]) {
    return (product instanceof ProductCreateDto) ?
      await this.productService.insertOne(product) :
      await this.productService.insertMany(product);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async updateOne(@Param('id') id: string, @Body() product: ProductCreateDto) {
    return await this.productService.updateById(id, product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async deleteOne(@Param('id') id: string) {
    return await this.productService.deleteById(id);
  }
}
