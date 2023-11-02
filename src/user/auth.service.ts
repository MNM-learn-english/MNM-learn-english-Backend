import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./entities/user.entity";
import { UserDto } from "./dto/user-dto";


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService: UserService){}


    async signup(createUserDto: CreateUserDto): Promise<UserDocument>{
        const user = await this.userService.find(createUserDto.email);
        if(user.length){
            throw new BadRequestException('email is already taken!')
        }
        const salt = randomBytes(8).toString('hex'); // slat for concat to pass

        const hashedPassword = (await scrypt(createUserDto.password, salt, 32)) as Buffer;

        const result = salt + '.' + hashedPassword.toString('hex');
        createUserDto.password = result;
        try{
            const newUser = await this.userService.create(createUserDto)
            return newUser;
        }catch(err){
            throw new BadRequestException(err)
        }
    }
    async signin(email: string, password: string){
        const user = await this.userService.find(email);
        if(!user || user.length === 0){
            throw new NotFoundException('user not found')
        }
        const [salt, userDbPassword] = user[0].password.split('.');
        const hashIncomingPassword = (await scrypt(password, salt, 32)) as Buffer;

        if(userDbPassword !== hashIncomingPassword.toString('hex')){
            throw new BadRequestException('Bad email or password!')
        }else{
            return user[0];
        }

    }
}