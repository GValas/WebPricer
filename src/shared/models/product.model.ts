import { CurrencyCode, UnderlyingCode } from './currency.model';
import { VanillaPayoff } from './payoff.vanilla.model';
import { Quote } from './quote.model';

export interface Product {
  id: string;
  quantity: number;
  underlying: UnderlyingCode;
  quantoCurrency: CurrencyCode;
  payoff: VanillaPayoff;
  quote?: Quote;
}
