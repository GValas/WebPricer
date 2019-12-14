import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrencyCreateDto } from './currency-create.dto';
import { CurrencyUpdateDto } from './currency-update.dto';
import { CurrencyDocument } from './currency-document.interace';

const logger: Logger = new Logger('CurrencyService');

@Injectable()
export class CurrencyService {

    constructor(@InjectModel('Currency') private readonly currencyModel: Model<CurrencyDocument>) { }

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

    async createOne(currency: CurrencyCreateDto) {
        logger.log(`create currency=${JSON.stringify(currency)}`);
        const createdCurrency = new this.currencyModel(currency);
        return await createdCurrency
            .save();
    }

    async createMany(currencies: CurrencyCreateDto[]) {
        Logger.log(`insertMany currency=${currencies}`);
        return await Promise.all(
            currencies.map(async (currency) => {
                const createdCurrency = new this.currencyModel(currency);
                return await createdCurrency
                    .save();
            }),
        );
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

    async deleteAll() {
        return await this.currencyModel
            .deleteMany({})
            .exec();
    }



}
