import { Document } from 'mongoose';
import { IProduct } from '../../../shared/interfaces/product.interface';
export interface IProductDocument extends IProduct, Document {}
