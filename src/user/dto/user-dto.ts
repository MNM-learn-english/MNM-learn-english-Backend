import {Expose, Exclude} from "class-transformer";


export class UserDto {
    @Expose()
    _id: string;
    
    @Expose()
    email: string;
    
    @Expose()
    userName: string;
    
    @Expose()
    level: string;
    
    @Expose()
    mobileNumber: string;

    @Expose()
    avatar: string;

    @Expose()
    role: string;

    @Exclude()
    password: string;
    
}