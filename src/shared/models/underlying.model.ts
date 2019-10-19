import { Currency, CurrencyCode } from './currency.model';

export interface Underlying {
  code: string;
  spot: number;
  volatility: number;
  currency: CurrencyCode;
}

export enum UnderlyingCode {
  BNPP = 'BNP Paribas',
  SOGE = 'Société Générale',
}
