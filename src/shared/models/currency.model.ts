export interface Currency {
  code: CurrencyCode;
  rate: number;
}

export enum CurrencyCode {
  EUR = 'EUR',
  USD = 'USD',
}

export enum UnderlyingCode {
  BNPP = 'BNPP.PA',
  SOGE = 'SOGN.PA',
  HSBC = 'HSBA.L',
}
