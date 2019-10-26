import { CurrencyCode } from "./currency-code";
import { VanillaPayoff } from './payoff.vanilla.model';
import { Quote } from './quote.model';
import { UnderlyingCode } from "./underlying-code";

export interface Product {
  id: string;
  quantity: number;
  underlying: UnderlyingCode;
  quantoCurrency: CurrencyCode;
  payoff: VanillaPayoff;
  quote?: Quote;
}
