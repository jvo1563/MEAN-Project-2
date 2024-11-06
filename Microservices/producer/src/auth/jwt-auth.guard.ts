import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Determines whether the current request is allowed to access the protected resource.
   * If the method or class is marked as 'isPublic', the request is allowed to proceed.
   * Otherwise, the default JWT authentication guard is used to verify the request.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check the isPublic metadata tag
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    // If public method let through
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
