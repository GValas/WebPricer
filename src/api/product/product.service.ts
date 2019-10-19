import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../../shared/models/product.model';
import { DataRepository } from '../data/data.repository';
import * as uuid from 'uuid';

const logger: Logger = new Logger('ProductService');

@Injectable()
export class ProductService {
  constructor(private readonly dataRepository: DataRepository) { }

  async getAll() {
    Logger.log('getAll');
    const res = this.dataRepository.products.value();
    return await res;
  }

  async getById(id: string) {
    Logger.log(`getById id=${id}`);
    return await this.dataRepository.products.find(x => x.id === id).value();
  }

  async insertOne(product: Product) {
    this.validateProduct(product);
    product.id = uuid.v4();
    await this.dataRepository.products.push(product).write();
    return product;
  }

  async updateById(id: string, product: Product) {
    this.validateProduct(product);
    return await this.dataRepository.products
      .find(x => x.id === id)
      .assign(product)
      .write();
  }

  async deleteById(id: string) {
    return await this.dataRepository.products.remove({ id }).write();
  }

  validateProduct(product: Product) {
    if (!product.payoff) {
      throw new Error('payoff is required');
    }
    if (!product.quantity) {
      throw new Error('quantity is required');
    }
    if (!product.quantoCurrency) {
      throw new Error('currency');
    }
    if (!product.underlying) {
      throw new Error('underlying is required');
    }
  }
}
