import { VanillaType } from '../enums/vanilla-type.enum';

export interface BlackScholesDescription {
    spot: number;
    strike: number;
    volatility: number;
    rate: number;
    timeToMaturity: number;
    vanillaType: VanillaType;
}
