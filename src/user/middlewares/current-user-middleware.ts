import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";


declare global{
    namespace Express{
        interface Request{
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware{
    constructor(private userService: UserService){}
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('inside middlewae')
        const {userId} = req.session || {};
        if(userId){
            const user = await this.userService.findOne(userId);

            req.currentUser = user;
        }
        next();
        
    }
}