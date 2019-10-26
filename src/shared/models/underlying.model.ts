import { Currency } from './currency.model';
import { CurrencyCode } from "./currency-code";

export interface Underlying {
  code: string;
  spot: number;
  volatility: number;
  currency: CurrencyCode;
}


