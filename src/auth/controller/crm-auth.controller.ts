import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDocument } from 'src/user/model/user.schema';

@Controller('crm/auth')
export class CrmAuthController {
    constructor( private authService: AuthService){}

    @Get('/me')
    getMe(@CurrentUser() user: UserDocument){
        return user;
    }
    
    @Post('/signin')
    async signin(@Body() body: {email: string, password: string}, @Session() session: any){
        const user =  await this.authService.signin(body.email, body.password);
        session.userId = user._id;
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any){
        session.userId = null;
    }
}
