import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserDocument } from "src/user/model/user.schema";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { SignInUserDto } from "./dto/signin-user.dto";
import { ConfigService } from "@nestjs/config";
import { CacheService } from "src/cache/cache.service";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { AdminSignInDto } from "./dto/singin-admin.dto";
import { EmailService } from "src/email/email.service";


const salt = 8;

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly cacheManager: CacheService,
        private readonly emailService: EmailService
        ){}

    async adminSigin(AdminSignInDto: AdminSignInDto): Promise<UserDocument>{
        const {email, password} = AdminSignInDto;
        const user = await this.userService.findUserWithPass({email});
        if(!!user){
            throw new BadRequestException('email is already taken!')
        }
        // check for password
        const userDbPassword = user.password;
        const hashIncomingPassword = await bcrypt.compare(password, userDbPassword);

        
        if(!hashIncomingPassword){
            throw new BadRequestException('Bad email or password!')
        }else{
            delete user.password;
            return user;
        }

    }

   
    async signin(signinUserDto: SignInUserDto){
        const {email} = signinUserDto;
        const user = await this.userService.findOne({email});
        if(!user){
            console.log("user not found")
            // create new user
            // generate otp
            // send email to user
            const newUser = await this.userService.createUser(signinUserDto);
            await this.generateOtpAndSendEmail(newUser)
            return newUser;
        }else{
            console.log("user exists")
            await this.generateOtpAndSendEmail(user)
            return user;
        }

    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto){
        const {email, otp} = verifyOtpDto;
        // get user 
        const user = await this.userService.findOne({email})
        if(!user){
            throw new NotFoundException('User Not Found!')
        }
        // get otp from resid
        const storedOtp = await this.cacheManager.get(user._id.toHexString());
        if(!!storedOtp){
            if(storedOtp == otp){
                return user;
            }else{
                throw new BadRequestException('otp is not correct!')
            }
        }else{
            throw new BadRequestException('otp expired! please try again!')
        }
    }



    async generateOtpAndSendEmail(user: UserDocument){
        const min = 1000;
        const max = 9999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        // find if top is stored redis previously
        await this.cacheManager.delete(user._id.toHexString())
        // save it to redis
        await this.cacheManager.set(user._id.toHexString(), otp, 3600)

        // send email
        try{
            await this.emailService.sendEmail(user.email, otp.toString())
        }catch(err){
            console.log(err)
            // reject
            throw new BadRequestException('sorry there is an error while sending email to you please try again!')
        }
    }
}