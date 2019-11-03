import * as mongoose from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
    code: {
        type: String,
        min: 3,
        max: 3,
        uppercase: true,
        unique: true,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
});
