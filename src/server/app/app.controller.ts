import { Controller, Get, HttpException, HttpStatus, UseFilters, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
// @UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) { }

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

    //throw new HttpException('Forbidfdden', HttpStatus.FORBIDDEN);
    return this.appService.getHello();
  }
}
