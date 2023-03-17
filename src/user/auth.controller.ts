import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    // @Get('/me')
    // getMe(@CurrentUser() user: User){
    //     return user;
    // }

    @Post('/signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any){
        const user =  await this.authService.signup(body);
        session.userId = user._id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any){
        const user =  await this.authService.signin(body.email, body.password);
        session.userId = user._id;
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any){
        session.userId = null;
    }
}
