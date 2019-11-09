import { VanillaPayoff } from './vanilla-payoff.interface';
import { Quote } from './quote.interface';

export interface Product {
  readonly quantity: number;
  readonly underlying: string;
  readonly quantoCurrency: string;
  readonly payoff: VanillaPayoff;
  quote?: Quote;
}
