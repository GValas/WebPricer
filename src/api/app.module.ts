import { Module, NestModule, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { logger } from './utils/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { PriceModule } from './price/price.module';
import { ProductModule } from './product/product.module';
import { UnderlyingModule } from './underlying/underlying.module'; 
import { CurrencyModule } from './currency/currency.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ProductModule,
    PriceModule,
    UnderlyingModule,
    CurrencyModule,
    AuthModule,
    UsersModule,
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
