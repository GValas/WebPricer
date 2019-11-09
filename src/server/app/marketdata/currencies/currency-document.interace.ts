import { Document } from 'mongoose';
import { Currency } from '../../../../shared/interfaces/currency.interface';
export interface CurrencyDocument extends Currency, Document {
}
