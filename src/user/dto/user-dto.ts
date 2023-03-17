import {Expose, Exclude} from "class-transformer";


export class UserDto {
    _id: string;
    email: string;

    @Exclude()
    password: string;
    
}