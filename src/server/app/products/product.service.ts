import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../../../shared/interfaces/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCreateDto } from './product-create.dto';
import { randomDate, randomNumber, randomEnum, randomValue } from '../../../shared/helpers/random-generators';
import { VanillaType } from '../../../shared/enums/vanilla-type.enum';
import { ExerciseMode } from '../../../shared/enums/exercise-mode.enum';
import { CurrencyService } from '../marketdata/currencies/currency.service';
import { UnderlyingService } from '../../shared/services/underlying.service';
import { ProductDocument } from './product-document.interface';

const logger: Logger = new Logger('ProductService');

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
    private readonly currencyService: CurrencyService,
    private readonly underlyingService: UnderlyingService,
  ) { }

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

  async insertOne(product: ProductCreateDto) {
    Logger.log(`insertOne product=${product}`);
    const createdProduct = new this.productModel(product);
    return await createdProduct
      .save();
  }

  async insertMany(products: ProductCreateDto[]) {
    Logger.log(`insertMany product=${products}`);
    return await Promise.all(
      products.map(async (product) => {
        const createdProduct = new this.productModel(product);
        return await createdProduct
          .save();
      }),
    );
  }

  async updateById(id: string, product: ProductCreateDto) {
    Logger.log(`updateById id=${id}`);
    return await this.productModel
      .findByIdAndUpdate(id, product, { new: true });
  }

  async deleteById(id: string) {
    Logger.log(`deleteById id=${id}`);
    return await this.productModel
      .findByIdAndRemove(id);
  }

  async generateRandom(size: number) {
    Logger.log(`generateProducts size=${size}`);
    const currencies = (await this.currencyService.findAll()).map(ccy => ccy.code);
    const underlyings = (await this.underlyingService.findAll()).map(udl => udl.code);
    const products: Product[] = [];

    [...Array(size)].forEach((_, i) => {
      const product: Product = {
        payoff: {
          maturityDate: randomDate(new Date(2022, 0, 1), new Date(2020, 0, 1)),
          strike: Math.round(randomNumber(10, 100)),
          vanillaType: randomEnum(VanillaType),
          exerciseMode: randomEnum(ExerciseMode),
        },
        quantity: 1,
        quantoCurrency: randomValue(currencies),
        underlying: randomValue(underlyings),
      };
      products.push(product);
    });

    return products;
  }

}
