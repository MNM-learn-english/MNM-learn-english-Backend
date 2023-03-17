import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import { UserService } from "../user.service";


// export function Serialize(dto: any){
//     return UseInterceptors(new SerializeInterceptor(dto))
// }

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService){}
    async intercept(
        context: ExecutionContext,
        handler: CallHandler,
    ){
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session;
        if(userId){
            const user = await this.userService.findOne(userId);
            // pass user to request
            request.currentUser = user;
        }
        return handler.handle();
    }
}