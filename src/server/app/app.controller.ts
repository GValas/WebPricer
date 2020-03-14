import { Controller, Get, HttpException, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Currency } from '../../shared/interfaces/currency.interface'
import { Underlying } from '../../shared/interfaces/underlying.interface'
import { UnderlyingService } from '../shared/services/underlying.service'
import { AppService } from './app.service'
import { CurrencyService } from './marketdata/currencies/currency.service'
import { ProductService } from './products/product.service'

@Controller()
// @UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly currencyService: CurrencyService,
    private readonly underlyingService: UnderlyingService,
    private readonly productService: ProductService,
  ) { }

  // // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log('----------login---------')
  //   //return req.user;
  //   return { 'tt': 'oo' };
  // }

  @Get()
  getHello(): string {

    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     why : 'why not',
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );

    // throw new HttpException('Forbidfdden', HttpStatus.FORBIDDEN);
    return this.appService.getHello()
  }

  @Get('resetData')
  async resetData() {
    await this.resetCurrencies()
    await this.resetUnderlyings()
    await this.resetProducts()
  }

  async resetProducts() {
    const products = await this.productService.generateRandom(20)
    await this.productService.deleteAll()
    await this.productService.createMany(products)
  }

  async resetUnderlyings() {
    const underlyings: Underlying[] = [
      { code: 'BNPP.PA', currency: 'EUR', spot: 100, volatility: 0.3 },
      { code: 'SOGE.PA', currency: 'EUR', spot: 50, volatility: 0.4 },
    ]
    await this.underlyingService.deleteAll()
    await this.underlyingService.createMany(underlyings)
  }

  async resetCurrencies() {
    const currencies: Currency[] = [
      { code: 'EUR', rate: 0.08 },
      { code: 'USD', rate: 0.05 },
    ]
    await this.currencyService.deleteAll()
    await this.currencyService.createMany(currencies)
  }


}
