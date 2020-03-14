import { Quote } from './quote.interface'
import { VanillaPayoff } from './vanilla-payoff.interface'

export interface Product {
  readonly quantity: number
  readonly underlying: string
  readonly quantoCurrency: string
  readonly payoff: VanillaPayoff
  quote?: Quote
}
