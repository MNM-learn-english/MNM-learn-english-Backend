import {Expose, Exclude} from "class-transformer";


export class UserDto {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    userName: string;
    @Expose()
    level: string;
    @Expose()
    mobileNumber: string;


    @Exclude()
    password: string;
    
}