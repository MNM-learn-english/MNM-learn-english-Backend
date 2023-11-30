
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector  
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string>('roles', context.getHandler()) || [];
        if(!roles){
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.currentUser;
        if(!user){
            return false;
        }
        if(roles.indexOf(user.role) !== -1){
            return true
        }else{
            return false
        }
    }
}