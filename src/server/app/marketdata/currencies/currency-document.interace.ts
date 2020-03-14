import { Document } from 'mongoose'
import { ICurrency } from '../../../../shared/interfaces/currency.interface'
export interface ICurrencyDocument extends ICurrency, Document {}
