import { IsDefined, IsEmail } from 'class-validator';

export class UserLoginDto {

    @IsDefined()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    readonly password: string;
}
