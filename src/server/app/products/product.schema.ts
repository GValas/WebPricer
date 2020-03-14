import { Schema } from 'mongoose'

export const ProductSchema = new Schema({
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
        forward: Number,
        price: Number,
        delta: Number,
        gamma: Number,
        vega: Number,
    },
})
