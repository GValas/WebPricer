import { Document } from 'mongoose';
import { VanillaPayoff } from './payoff.vanilla.model';
import { Quote } from './quote.model';

export interface Product extends Document {
  id: string;
  quantity: number;
  underlying: string;
  quantoCurrency: string;
  payoff: VanillaPayoff;
  quote?: Quote;
}
