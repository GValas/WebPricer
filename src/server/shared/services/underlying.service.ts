import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnderlyingCreateDto } from '../../app/marketdata/underlyings/underlying-create.dto';
import { UnderlyingUpdateDto } from '../../app/marketdata/underlyings/underlying-update.dto';
import { UnderlyingDocument } from '../../app/marketdata/underlyings/underlying-document.interface';
const logger: Logger = new Logger('UnderlyingService');

@Injectable()
export class UnderlyingService {

    constructor(@InjectModel('Underlying') private readonly underlyingModel: Model<UnderlyingDocument>) { }

    async findAll() {
        logger.log('findAll');
        return await this.underlyingModel
            .find()
            .exec();
    }

    async findByCode(code: string) {
        logger.log(`findByCode id=${code}`);
        return await this.underlyingModel
            .findOne({ code })
            .exec();
    }

    async createOne(underlying: UnderlyingCreateDto) {
        logger.log(`create underlying=${JSON.stringify(underlying)}`);
        const createdUnderlying = new this.underlyingModel(underlying);
        return await createdUnderlying
            .save();
    }

    async createMany(underlyings: UnderlyingCreateDto[]) {
        Logger.log(`insertMany underlying=${underlyings}`);
        return await Promise.all(
            underlyings.map(async (underlying) => {
                const createdUnderlying = new this.underlyingModel(underlying);
                return await createdUnderlying
                    .save();
            }),
        );
    }

    async updateByCode(code: string, underlying: UnderlyingUpdateDto) {
        logger.log(`update, code=${code}, underlying=${JSON.stringify(underlying)}`);
        return await this.underlyingModel
            .updateOne({ code }, underlying)
            .exec();
    }

    async deleteByCode(code: string) {
        return await this.underlyingModel
            .deleteOne({ code })
            .exec();
    }

    async deleteAll() {
        return await this.underlyingModel
            .deleteMany({})
            .exec();
    }

}
