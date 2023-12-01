import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDocument } from 'src/user/model/user.schema';
import { SignInUserDto } from '../dto/signin-user.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';




@Controller('panel/auth')
export class PanelAuthController {
    constructor( private authService: AuthService){}

    @Get('/me')
    getMe(@CurrentUser() user: UserDocument){
        return user;
    }
    
    @Post('/signin')
    async signin(@Body() signinUserDto: SignInUserDto){
        await this.authService.signin(signinUserDto);
        return {
            message: "we send you an email, please check your inbox!"
        };
    }

    @Post('/verify-otp')
    async verifyOtp(
        @Body() verifyOtpDto: VerifyOtpDto,
        @Session() session: any
    ){
        const user= await this.authService.verifyOtp(verifyOtpDto);
        session.userId = user._id;
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any){
        session.userId = null;
    }
}
