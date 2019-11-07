import { Document } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

export interface User extends Document {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly roles: UserRole[];
}
