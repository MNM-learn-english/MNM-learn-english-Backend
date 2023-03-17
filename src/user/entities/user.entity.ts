import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserLevelEnum } from "../dto/user-level-interface";



export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    userName: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, unique: true})
    mobileNumber: string;

    @Prop()
    avatar: string;

    @Prop({enum: UserLevelEnum, default: UserLevelEnum.preInterMediate})
    level: UserLevelEnum;

};


export const UserSchema = SchemaFactory.createForClass(User);
