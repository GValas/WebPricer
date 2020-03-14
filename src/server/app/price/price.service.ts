import { Injectable } from '@nestjs/common'
import { VanillaType } from '../../../shared/enums/vanilla-type.enum'
import { sleep } from '../../../shared/helpers/async'
import { priceVanilla } from '../../../shared/helpers/blackscholes'
import { IProduct } from '../../../shared/interfaces/product.interface'
import { IQuote } from '../../../shared/interfaces/quote.interface'

@Injectable()
export class PriceService {
    async priceOne(product: IProduct): Promise<IQuote> {
        await sleep(1)
        return priceVanilla({
            vanillaType: VanillaType.Call,
            spot: 100,
            volatility: 0.3,
            rate: 0.08,
            strike: 100,
            timeToMaturity: 1
        })
    }
}
