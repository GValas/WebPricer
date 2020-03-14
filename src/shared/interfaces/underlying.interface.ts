import { ICurrency } from './currency.interface'

export interface IUnderlying {
    readonly code: string
    readonly spot: number
    readonly volatility: number
    readonly currency: string
}
