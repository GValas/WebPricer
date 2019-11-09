import { Document } from 'mongoose';
import { Underlying } from '../../../../shared/interfaces/underlying.interface';
export interface UnderlyingDocument extends Underlying, Document {
}
