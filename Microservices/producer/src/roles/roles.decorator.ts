/**
 * Decorator that sets the 'roles' metadata on a class or method.
 * The 'roles' metadata can be used to restrict access to the decorated class or method
 * to users with the specified roles.
 */
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
