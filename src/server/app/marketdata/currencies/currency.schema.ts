import { Schema } from 'mongoose';

export const CurrencySchema = new Schema({
    code: {
        type: String,
        min: 3,
        max: 3,
        uppercase: true,
        unique: true,
        required: true,
        index: true,
    },
    rate: {
        type: Number,
        required: true,
    },
});
