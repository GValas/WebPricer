import { Document } from 'mongoose';

export interface Currency extends Document {
  readonly code: string;
  readonly rate: number;
}
