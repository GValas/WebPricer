import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../shared/models/user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findAll() {
        return this.userModel.find().exec();
    }

    async create(user: CreateUserDto): Promise<User> {
        return new this.userModel(user).save();
    }

    async findOne(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }
}
