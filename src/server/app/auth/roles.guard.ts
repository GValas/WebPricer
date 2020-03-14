import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { UserRole } from '../../../shared/enums/user-role.enum'
import { isEmptyIntersection } from '../../../shared/helpers/arrays'
import { UsersService } from '../users/user.service'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userEmail = context.getArgs()[0].user
    const hasPermission = this.usersService.findByEmail(userEmail).then(user => {
      const routeRoles = this.reflector.get<UserRole[]>('roles', context.getHandler())
      const userRoles = user.roles
      return !isEmptyIntersection(userRoles, routeRoles)
    })
    return hasPermission
  }

}
