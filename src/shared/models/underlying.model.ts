import { Currency, CurrencyCode } from './currency.model';

export interface Underlying {
  code: string;
  spot: number;
  volatility: number;
  currency: CurrencyCode;
}

export enum UnderlyingCode {
  BNPP = 'BNPP.PA',
  SOGE = 'SOGN.PA',
  HSBC = 'HSBA.L',
}
