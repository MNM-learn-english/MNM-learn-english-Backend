import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


export const AuthorizeGuard = () => {
    return new AuthorizationGuard(new Reflector())
}

export class AuthorizationGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
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