import { Module, NestModule, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './utils/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { PriceModule } from './price/price.module';
import { ProductModule } from './products/product.module';
import { UnderlyingModule } from './marketdata/underlyings/underlying.module';
import { CurrencyModule } from './marketdata/currencies/currency.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [
    ProductModule,
    PriceModule,
    UnderlyingModule,
    CurrencyModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(config.mongoUri, config.mongoOptions),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
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
