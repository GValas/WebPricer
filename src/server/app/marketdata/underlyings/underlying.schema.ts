import * as mongoose from 'mongoose';

export const UnderlyingSchema = new mongoose.Schema({
    code: String,
    spot: Number,
    volatility: Number,
    currency: String,
});
