import { Document } from 'mongoose';
import { User } from '../../../shared/interfaces/user.interface';
export interface UserDocument extends User, Document {
}
