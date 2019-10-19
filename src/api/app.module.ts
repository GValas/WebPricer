import { Module, NestModule, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataRepository } from './data/data.repository';
import { logger } from './utils/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { PriceModule } from './price/price.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    PriceModule,
  ],
  controllers: [
    AppController ,
  ],
  providers: [ 
    AppService,
    DataRepository,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger);
  }
}
