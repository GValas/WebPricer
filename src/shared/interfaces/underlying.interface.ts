import { Currency } from './currency.interface';

export interface Underlying {
  readonly code: string;
  readonly spot: number;
  readonly volatility: number;
  readonly currency: string;
}
