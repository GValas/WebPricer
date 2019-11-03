import { Document } from 'mongoose';
import { VanillaPayoff } from './vanilla-payoff.interface';
import { Quote } from './quote.interface';

export interface Product extends Document {
  readonly id: string;
  readonly quantity: number;
  readonly underlying: string;
  readonly quantoCurrency: string;
  readonly payoff: VanillaPayoff;
  quote?: Quote;
}
