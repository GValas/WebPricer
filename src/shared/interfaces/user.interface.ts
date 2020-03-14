import { UserRole } from '../enums/user-role.enum'

export interface IUser {
    readonly email: string
    password: string
    readonly roles: UserRole[]
}
