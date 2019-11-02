import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Underlying } from '../../../../shared/models/underlying.model';
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

}
