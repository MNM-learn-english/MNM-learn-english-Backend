import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { UserDocument } from '../model/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';


@UseGuards(AuthGuard)
@Controller('panel/user')
export class panelUserController {
  constructor(private readonly userService: UserService) {}
  
 
  @Patch()
  async update(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto
) {
    console.log("user", user)
    delete updateUserDto.email;
    return await this.userService.update({_id: user._id}, updateUserDto);
  }

}
