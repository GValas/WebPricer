import { Controller, Get, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './utils/http-exception.filter';

@Controller()
// @UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

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

    throw new HttpException('Forbidfdden', HttpStatus.FORBIDDEN);
    return this.appService.getHello();
  }
}
