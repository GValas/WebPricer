import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Product } from '../../shared/models/product.model';
import { Currency } from '../../shared/models/currency.model';
import { CurrencyCode } from "../../shared/models/currency-code";
import { Underlying } from '../../shared/models/underlying.model';
import { UnderlyingCode } from "../../shared/models/underlying-code";
import { generateProducts } from '../product/product.helper';
import { User } from '../../shared/models/user.model';
import { fstat, unlinkSync } from 'fs';

const logger: Logger = new Logger('DataRepository');

interface Database {
  users: User[];
  products: Product[];
  currencies: Currency[];
  underlyings: Underlying[];
}

@Injectable()
export class DataRepository implements OnModuleInit {
  public db: lowdb.LowdbSync<Database>;

  get users() {
    return this.db.get('users');
  }

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
    unlinkSync(dbPath);
    const adapter = new FileSync(dbPath);

    this.db = lowdb(adapter);
    this.db.defaults(generateData()).write();
  }
}

function generateData(): Database {
  return {

    users: [
      {
        id: '7d56d7c5-36b7-41c0-9e35-f5a28f0bab0c',
        username: 'john',
        password: 'changeme',
      },
      {
        id: '579c2906-88b8-4005-8c6d-5a32d46822af',
        username: 'chris',
        password: 'secret',
      },
      {
        id: '70ad72bb-2151-4976-9610-6ad9f5695418',
        username: 'maria',
        password: 'guess',
      },
    ],

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
