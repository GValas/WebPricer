import * as bcrypt from 'bcrypt'
import { Schema } from 'mongoose'
import config from '../config/config'
import { IUserDocument } from './user-document.interface'

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        required: true
    }
})
