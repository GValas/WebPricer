import { UserRole } from '../enums/user-role.enum';

export interface User {
  readonly email: string;
  readonly password: string;
  readonly roles: UserRole[];
}
