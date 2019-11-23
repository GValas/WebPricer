export interface BlackScholesRequest {
    spot: number;
    strike: number;
    volatility: number;
    rate: number;
    timeToMaturity: number;
}
