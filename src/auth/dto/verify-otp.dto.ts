import { IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;

}