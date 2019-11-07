import { IsEmail, IsDefined, IsEnum } from 'class-validator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { UserLoginDto } from '../auth/user-login.dto';

export class UserCreateDto extends UserLoginDto {

    @IsDefined()
    @IsEnum(UserRole, { each: true })
    readonly roles: UserRole[];

}
