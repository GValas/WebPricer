import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import config from '../config/config';
import { UserDocument } from './user-document.interface';

export const UserSchema = new Schema({
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
