import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../../../../shared/interfaces/currency.interface';
import { CurrencyCreateDto } from './currency-create.dto';
import { CurrencyUpdateDto } from './currency-update.dto';

const logger: Logger = new Logger('CurrencyService');

@Injectable()
export class CurrencyService {

    constructor(@InjectModel('Currency') private readonly currencyModel: Model<Currency>) { }

    async findAll() {
        logger.log('findAll');
        return await this.currencyModel
            .find()
            .exec();
    }

    async findByCode(code: string) {
        logger.log(`findByCode id=${code}`);
        return await this.currencyModel
            .findOne({ code })
            .exec();
    }

    async create(currency: CurrencyCreateDto) {
        logger.log(`create currency=${JSON.stringify(currency)}`);
        const createdCurrency = new this.currencyModel(currency);
        return await createdCurrency
            .save();
    }

    async updateByCode(code: string, currency: CurrencyUpdateDto) {
        logger.log(`update, code=${code}, currency=${JSON.stringify(currency)}`);
        return await this.currencyModel
            .updateOne({ code }, currency)
            .exec();
    }

    async deleteByCode(code: string) {
        return await this.currencyModel
            .deleteOne({ code })
            .exec();
    }

}
