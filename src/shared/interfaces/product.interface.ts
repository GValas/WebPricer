import { IQuote } from './quote.interface'
import { IVanillaPayoff } from './vanilla-payoff.interface'

export interface IProduct {
    readonly quantity: number
    readonly underlying: string
    readonly quantoCurrency: string
    readonly payoff: IVanillaPayoff
    quote?: IQuote
}
