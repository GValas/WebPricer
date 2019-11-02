import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    quantity: Number,
    underlying: String,
    quantoCurrency: String,
    payoff: {
        strike: Number,
        maturityDate: Date,
        exerciseMode: String,
        vanillaType: String,
    },
    quote: {
        price: Number,
        delta: Number,
        gamma: Number,
        vega: Number,
    },
});
