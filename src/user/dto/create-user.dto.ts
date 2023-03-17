import { IsString, IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from "class-validator";
import { UserLevelEnum } from "./user-level-interface";


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
    level?: UserLevelEnum

}
