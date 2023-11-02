import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserDocument } from "src/user/model/user.schema";
import { UserService } from "src/user/user.service";
import { promisify } from "util";
import * as bcrypt from "bcryptjs";



const salt = 8;

@Injectable()
export class AuthService{
    constructor(private userService: UserService){}


    async signup(createUserDto: CreateUserDto): Promise<UserDocument>{
        const {email} = createUserDto;
        const user = await this.userService.findOne({email});
        if(!!user){
            throw new BadRequestException('email is already taken!')
        }
        try{
            const newUser = await this.userService.create(createUserDto)
            return newUser;
        }catch(err){
            throw new BadRequestException(err)
        }
    }
    async signin(email: string, password: string){
        const user = await this.userService.findUserWithPass({email});
        if(!user){
            throw new NotFoundException('user not found')
        }
        const userDbPassword = user.password;
        const hashIncomingPassword = await bcrypt.compare(password, userDbPassword);

        
        if(!hashIncomingPassword){
            throw new BadRequestException('Bad email or password!')
        }else{
            delete user.password;
            return user;
        }

    }
}