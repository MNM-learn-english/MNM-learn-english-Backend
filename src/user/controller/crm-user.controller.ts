import { Controller, Get, Param, Delete, UseGuards, Post, Body, BadRequestException, Query, Patch } from '@nestjs/common';
import { UserService } from '../user.service';
import { Serialize } from '../../interceptors/serialize-interceptor';
import { UserDto } from '../dto/user-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterQuery } from 'mongoose';
import { UserDocument } from '../model/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('crm/user')
export class CrmUserController {
  constructor(private readonly userService: UserService) {}

  @Roles('Admin')
  @Get() 
  async findAll(
    @Query() filterQuery: FilterQuery<UserDocument>
  ) {
    return await this.userService.findAll(filterQuery);
  }


  @Roles('Admin')
  @Post()
  async create(
    @Body() CreateUserDto: CreateUserDto
  ){
    return await this.userService.create(CreateUserDto)
  }

  @Roles('Admin')
  @Patch(':id')
  async update(
    @Param('id') _id: string,
    @Body() updateUserdto: UpdateUserDto
  ){
    return await this.userService.update({_id}, updateUserdto)
  }

  @Roles('Admin')
  @Get(':id')
  async findOne(@Param('id') _id: string) {
    return await this.userService.findOne({_id});
  }

  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id') _id: string) {
    return await this.userService.remove({_id});
  }
}
