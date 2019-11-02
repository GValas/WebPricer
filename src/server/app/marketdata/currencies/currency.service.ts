import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../../../../shared/models/currency.model';
import { CreateCurrencyDto } from './create-currency-dto';

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

    async create(currency: CreateCurrencyDto) {
        const createdCurrency = new this.currencyModel(currency);
        return await createdCurrency
            .save();
    }

    async update(id: string, currency: CreateCurrencyDto) {
        return await this.currencyModel
            .findByIdAndUpdate(id, currency, { new: true });
    }

    async delete(id: string) {
        return await this.currencyModel
            .findByIdAndRemove(id);
    }

}
