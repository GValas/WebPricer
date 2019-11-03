import { Module, NestModule, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './utils/middleware/logger.middleware';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { PriceModule } from './price/price.module';
import { ProductModule } from './products/product.module';
import { UnderlyingModule } from './marketdata/underlyings/underlying.module';
import { CurrencyModule } from './marketdata/currencies/currency.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { MongoExceptionFilter } from './utils/filters/mongo-exception.filter';
import { RequestMonitorInterceptor } from './utils/interceptors/request-monitor.interceptor';

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
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestMonitorInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger);
  }
}
