import { Currency } from './currency.interface';
import { Document } from 'mongoose';

export interface Underlying extends Document {
  readonly code: string;
  readonly spot: number;
  readonly volatility: number;
  readonly currency: string;
}
