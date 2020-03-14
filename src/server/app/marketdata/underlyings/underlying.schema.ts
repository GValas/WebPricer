import { Schema } from 'mongoose'

export const UnderlyingSchema = new Schema({
    code: {
        type: String,
        uppercase: true,
        required: true,
        index: true,
    },
    spot: {
        type: Number,
        required: true,
    },
    volatility: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        min: 3,
        max: 3,
        uppercase: true,
        required: true,
    },
})
