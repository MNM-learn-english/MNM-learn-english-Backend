import { IsString, IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from "class-validator";
import { UserLevelEnum } from "./user-level-interface";
import { UserRoleEnum } from "./user-role-enum";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsMobilePhone()
    mobileNumber: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    avatar?: string;
    level?: UserLevelEnum;
    role?:UserRoleEnum;

}
