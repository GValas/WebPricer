import { UserRole } from '../enums/user-role.enum';

export interface User {
  readonly email: string;
  password: string;
  readonly roles: UserRole[];
}
