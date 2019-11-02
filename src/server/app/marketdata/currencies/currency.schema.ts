import * as mongoose from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
    code: { type: String, min: 3, max: 3, unique: true, required: true, dropDups: true },
    rate: { type: Number, required: true },
});
