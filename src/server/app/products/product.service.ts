import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ExerciseMode } from '../../../shared/enums/exercise-mode.enum'
import { VanillaType } from '../../../shared/enums/vanilla-type.enum'
import { randomDate, randomEnum, randomNumber, randomValue } from '../../../shared/helpers/random-generators'
import { IProduct } from '../../../shared/interfaces/product.interface'
import { UnderlyingService } from '../../shared/services/underlying.service'
import { CurrencyService } from '../marketdata/currencies/currency.service'
import { ProductCreateDto } from './product-create.dto'
import { IProductDocument } from './product-document.interface'

const logger: Logger = new Logger('ProductService')

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<IProductDocument>,
        private readonly currencyService: CurrencyService,
        private readonly underlyingService: UnderlyingService
    ) {}

    async findAll() {
        logger.log('findAll')
        return await this.productModel.find().exec()
    }

    async findById(id: string) {
        Logger.log(`findById id=${id}`)
        return await this.productModel.findById(id).exec()
    }

    async createOne(product: ProductCreateDto) {
        Logger.log(`insertOne product=${product}`)
        const createdProduct = new this.productModel(product)
        return await createdProduct.save()
    }

    async createMany(products: ProductCreateDto[]) {
        Logger.log(`insertMany product=${products}`)
        return await Promise.all(
            products.map(async product => {
                const createdProduct = new this.productModel(product)
                return await createdProduct.save()
            })
        )
    }

    async updateById(id: string, product: ProductCreateDto) {
        Logger.log(`updateById id=${id}`)
        return await this.productModel.findByIdAndUpdate(id, product, { new: true })
    }

    async deleteById(id: string) {
        Logger.log(`deleteById id=${id}`)
        return await this.productModel.findByIdAndRemove(id)
    }

    async deleteAll() {
        return await this.productModel.deleteMany({}).exec()
    }

    async generateRandom(size: number) {
        Logger.log(`generateProducts size=${size}`)
        const currencies = (await this.currencyService.findAll()).map(ccy => ccy.code)
        const underlyings = (await this.underlyingService.findAll()).map(udl => udl.code)
        const products: IProduct[] = [];

        [...Array(size)].forEach((_, i) => {
            const product: IProduct = {
                payoff: {
                    maturityDate: randomDate(new Date(2022, 0, 1), new Date(2020, 0, 1)),
                    strike: Math.round(randomNumber(10, 100)),
                    vanillaType: randomEnum(VanillaType),
                    exerciseMode: randomEnum(ExerciseMode)
                },
                quantity: 1,
                quantoCurrency: randomValue(currencies),
                underlying: randomValue(underlyings)
            }
            products.push(product)
        })

        return products
    }
}
