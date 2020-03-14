import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hash } from 'bcrypt'
import { Model } from 'mongoose'
import config from '../config/config'
import { UserCreateDto } from './user-create.dto'
import { IUserDocument } from './user-document.interface'
import { UserUpdateDto } from './user-update.dto'
const logger: Logger = new Logger('CurrencyService')

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUserDocument>) {}

    async findAll(): Promise<IUserDocument[]> {
        logger.log('findAll')
        return await this.userModel.find().exec()
    }

    async findByEmail(email: string): Promise<IUserDocument> {
        logger.log(`findByEmail id=${email}`)
        return await this.userModel.findOne({ email }).exec()
    }

    async createOne(user: UserCreateDto): Promise<IUserDocument> {
        logger.log(`create user=${JSON.stringify(user)}`)
        user.password = await hash(user.password, config.salt)
        const createdUser = new this.userModel(user)
        return await createdUser.save()
    }

    async updateByEmail(email: string, user: UserUpdateDto): Promise<IUserDocument> {
        logger.log(`update, email=${email}, user=${JSON.stringify(user)}`)
        return await this.userModel.updateOne({ email }, user).exec()
    }

    async deleteByEmail(email: string) {
        return await this.userModel.deleteOne({ email }).exec()
    }
}
