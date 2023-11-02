import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/libs/database";
import { UserDocument } from "./model/user.schema";






export class UserRepository extends AbstractRepository<UserDocument>{
    constructor(
        @InjectModel(UserDocument.name) 
        userModel: Model<UserDocument>,
    ){
        super(userModel)
    }
}