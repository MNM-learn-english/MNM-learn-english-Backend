import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserLevelEnum } from "../dto/user-level-interface";
import { Exclude } from "class-transformer";
import { UserRoleEnum } from "../dto/user-role-enum";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    userName: string;

    @Prop({enum: UserRoleEnum, default: UserRoleEnum.user})
    role: UserRoleEnum;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    @Exclude()
    password: string;

    @Prop({required: true, unique: true})
    mobileNumber: string;

    @Prop()
    avatar: string;

    @Prop({enum: UserLevelEnum, default: UserLevelEnum.preInterMediate})
    level: UserLevelEnum;

};


export const UserSchema = SchemaFactory.createForClass(User);
