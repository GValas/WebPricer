import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../../../shared/interfaces/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './create-product-dto';

const logger: Logger = new Logger('ProductService');

@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async findAll() {
    logger.log('findAll');
    return await this.productModel
      .find()
      .exec();
  }

  async findById(id: string) {
    Logger.log(`findById id=${id}`);
    return await this.productModel
      .findById({ id })
      .exec();
  }

  async insertOne(product: CreateProductDto) {
    Logger.log(`insertOne product=${product}`);
    const createdArticle = new this.productModel(product);
    return await createdArticle
      .save();
  }

  async updateById(id: string, product: CreateProductDto) {
    Logger.log(`updateById id=${id}`);
    return await this.productModel
      .findByIdAndUpdate(id, product, { new: true });
  }

  async deleteById(id: string) {
    Logger.log(`deleteById id=${id}`);
    return await this.productModel
      .findByIdAndRemove(id);
  }

}
