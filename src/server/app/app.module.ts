import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import config from './config/config'
import { CurrencyModule } from './marketdata/currencies/currency.module'
import { UnderlyingModule } from './marketdata/underlyings/underlying.module'
import { PriceModule } from './price/price.module'
import { ProductModule } from './products/product.module'
import { UserModule } from './users/user.module'
import { MongoExceptionFilter } from './utils/filters/mongo-exception.filter'
import { RequestMonitorInterceptor } from './utils/interceptors/request-monitor.interceptor'
import { logger } from './utils/middleware/logger.middleware'

@Module({
    imports: [
        ProductModule,
        PriceModule,
        UnderlyingModule,
        CurrencyModule,
        AuthModule,
        UserModule,
        MongooseModule.forRoot(config.mongoUri, config.mongoOptions)
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        {
            provide: APP_FILTER,
            useClass: MongoExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestMonitorInterceptor
        }
    ]
})
export class AppModule implements NestModule {
    async configure(consumer: MiddlewareConsumer) {
        consumer.apply(logger)
    }
}
