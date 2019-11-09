import { Document } from 'mongoose';
import { Product } from '../../../shared/interfaces/product.interface';
export interface ProductDocument extends Product, Document {
}
