import { Document } from 'mongoose'
import { IUser } from '../../../shared/interfaces/user.interface'
export interface IUserDocument extends IUser, Document {}
