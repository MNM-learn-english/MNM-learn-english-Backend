import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user.service";
import { UserDocument } from "../model/user.schema";


declare global{
    namespace Express{
        interface Request{
            currentUser?: UserDocument
        }
    }
}

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware{
    constructor(private userService: UserService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session || {};
        if(userId){
            const user = await this.userService.findOne({_id: userId});

            req.currentUser = user;
        }
        next();
        
    }
}