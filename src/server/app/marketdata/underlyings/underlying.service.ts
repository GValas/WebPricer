import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Underlying } from '../../../../shared/interfaces/underlying.interface';
import { UnderlyingCreateDto } from './underlying-create.dto';
import { UnderlyingUpdateDto } from './underlying-update.dto';
const logger: Logger = new Logger('UnderlyingService');

@Injectable()
export class UnderlyingService {

    constructor(@InjectModel('Underlying') private readonly underlyingModel: Model<Underlying>) { }

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

    async create(underlying: UnderlyingCreateDto) {
        logger.log(`create underlying=${JSON.stringify(underlying)}`);
        const createdUnderlying = new this.underlyingModel(underlying);
        return await createdUnderlying
            .save();
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

}
