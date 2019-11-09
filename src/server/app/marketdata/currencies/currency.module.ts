import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from './currency.schema';
import { UserModule } from '../../users/user.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
        UserModule,
    ],
    providers: [CurrencyService],
    controllers: [CurrencyController],
    exports: [CurrencyService],
})
export class CurrencyModule { }
