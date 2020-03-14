import { Document } from 'mongoose'
import { IUnderlying } from '../../../../shared/interfaces/underlying.interface'
export interface IUnderlyingDocument extends IUnderlying, Document {}
