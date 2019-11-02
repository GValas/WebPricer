import { Currency } from './currency.model';
import { Document } from 'mongoose';

export interface Underlying extends Document {
  code: string;
  spot: number;
  volatility: number;
  currency: string;
}
