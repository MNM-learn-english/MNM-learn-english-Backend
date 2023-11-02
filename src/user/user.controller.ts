import { Controller, Get, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize-interceptor';
import { UserDto } from './dto/user-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { AuthorizationGuard, AuthorizeGuard } from 'src/guards/authorization.guard';
import { Reflector } from '@nestjs/core';


@UseGuards(AuthGuard)
@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Roles('Admin')
  @UseGuards(AuthorizeGuard())
  @Get() 
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
