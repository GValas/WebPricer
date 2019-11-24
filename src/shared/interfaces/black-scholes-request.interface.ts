import { VanillaType } from '../enums/vanilla-type.enum';

export interface BlackScholesRequest {
    spot: number;
    strike: number;
    volatility: number;
    rate: number;
    timeToMaturity: number;
    vanillaType: VanillaType;
}
