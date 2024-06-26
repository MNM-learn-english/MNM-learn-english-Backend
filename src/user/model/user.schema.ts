import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserLevelEnum } from "../dto/user-level-interface";
import { Exclude } from "class-transformer";
import { UserRoleEnum } from "../dto/user-role-enum";
import { AbstractDocument } from "src/libs/database";



@Schema({timestamps: true})
export class UserDocument extends AbstractDocument {
    @Prop()
    userName?: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop()
    mobileNumber?: string;

    @Prop()
    avatar?: string;

    @Prop()
    password?: string;

    @Prop({enum: UserLevelEnum, default: UserLevelEnum.preInterMediate})
    level?: UserLevelEnum;

    @Prop({enum: UserRoleEnum, default: UserRoleEnum.user})
    role?: UserRoleEnum;
}




export const UserSchema = SchemaFactory.createForClass(UserDocument);



