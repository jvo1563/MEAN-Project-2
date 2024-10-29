import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the required roles needed to access
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no required roles return true
    // console.log(requiredRoles);
    if (!requiredRoles) return true;

    // Check the current user's role from JWT token
    const { user } = context.switchToHttp().getRequest();
    // console.log(user);

    // If the user has the required role return true
    return requiredRoles.includes(user.role.toLowerCase());
  }
}
