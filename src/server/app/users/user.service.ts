import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../shared/interfaces/user.interface';
import { UserCreateDto } from './user-create.dto';
import { UserUpdateDto } from './user-update.dto';
const logger: Logger = new Logger('CurrencyService');

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findAll() {
        logger.log('findAll');
        return await this.userModel
            .find()
            .exec();
    }

    async findByEmail(email: string) {
        logger.log(`findByEmail id=${email}`);
        return await this.userModel
            .findOne({ email })
            .exec();
    }

    async create(currency: UserCreateDto) {
        logger.log(`create currency=${JSON.stringify(currency)}`);
        const createdCurrency = new this.userModel(currency);
        return await createdCurrency
            .save();
    }

    async updateByEmail(email: string, currency: UserUpdateDto) {
        logger.log(`update, email=${email}, currency=${JSON.stringify(currency)}`);
        return await this.userModel
            .updateOne({ email }, currency)
            .exec();
    }

    async deleteByEmail(email: string) {
        return await this.userModel
            .deleteOne({ email })
            .exec();
    }
}
