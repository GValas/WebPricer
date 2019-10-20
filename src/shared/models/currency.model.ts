export interface Currency {
  code: CurrencyCode;
  rate: number;
}

export enum CurrencyCode {
  EUR = 'EUR',
  USD = 'USD',
}
