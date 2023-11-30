import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserLevelEnum } from "../dto/user-level-interface";
import { Exclude } from "class-transformer";
import { UserRoleEnum } from "../dto/user-role-enum";
import { AbstractDocument } from "src/libs/database";



@Schema({timestamps: true})
export class UserDocument extends AbstractDocument {
    @Prop({required: true, unique: true})
    userName: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    @Exclude()
    password: string;

    @Prop({required: true, unique: true})
    mobileNumber: string;

    @Prop()
    avatar?: string;

    @Prop({enum: UserLevelEnum, default: UserLevelEnum.preInterMediate})
    level?: UserLevelEnum;

    @Prop({enum: UserRoleEnum, default: UserRoleEnum.user})
    role?: UserRoleEnum;


};


export const UserSchema = SchemaFactory.createForClass(UserDocument);



