import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/user.service';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { intersectArrays, isEmptyArray } from '../../../shared/helpers/arrays';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log('---canActivate---')

    return true;
    // console.log('canActivate')
    // const userEmail = context.getArgs()[0].user.username;
    // console.log(userEmail)
    // const hasPermission = this.usersService.findByEmail(userEmail).then(user => {
    //   const routeRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    //   console.log(routeRoles)
    //   const userRoles = user.roles;
    //   console.log(userRoles)
    //   const intersect = intersectArrays(routeRoles, userRoles);
    //   console.log(intersect)
    //   return !isEmptyArray(intersect);
    // })
    // return hasPermission;
  }

}
