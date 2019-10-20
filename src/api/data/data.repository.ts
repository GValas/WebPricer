import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Product } from '../../shared/models/product.model';
import { Currency, CurrencyCode } from '../../shared/models/currency.model';
import { Underlying, UnderlyingCode } from '../../shared/models/underlying.model';
import { generateProducts } from '../product/product.helper';

const logger: Logger = new Logger('DataRepository');

interface Database {
  products: Product[];
  currencies: Currency[];
  underlyings: Underlying[];
}

@Injectable()
export class DataRepository implements OnModuleInit {
  public db: lowdb.LowdbSync<Database>;

  get products() {
    return this.db.get('products');
  }

  get currencies() {
    return this.db.get('currencies');
  }

  get underlyings() {
    return this.db.get('underlyings');
  }

  onModuleInit() {
    logger.log('onModuleInit');

    const dbPath = './src/api/data/db.json';
    const adapter = new FileSync(dbPath);

    this.db = lowdb(adapter);
    this.db.defaults(generateData()).write();
  }
}

function generateData(): Database {
  return {
    currencies: [
      {
        code: CurrencyCode.EUR,
        rate: 0.08,
      },
      {
        code: CurrencyCode.USD,
        rate: 0.05,
      },
    ],

    underlyings: [
      {
        code: UnderlyingCode.BNPP,
        currency: CurrencyCode.EUR,
        spot: 54,
        volatility: 0.3,
      },
      {
        code: UnderlyingCode.SOGE,
        currency: CurrencyCode.EUR,
        spot: 25,
        volatility: 0.4,
      },
    ],

    products: generateProducts(20),
  };
}
