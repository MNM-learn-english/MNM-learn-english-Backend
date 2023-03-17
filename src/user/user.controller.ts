import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize-interceptor';
import { UserDto } from './dto/user-dto';

@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
