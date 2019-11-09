import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
    },
});
