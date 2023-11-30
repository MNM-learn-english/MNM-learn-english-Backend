import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './model/user.schema';
import { UserRepository } from './user.repository';
import { randomBytes } from "crypto";
import * as bcrypt from "bcryptjs";



const salt = 8;
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository){}

  async hashPassword(password: string): Promise<string>{
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {

    const hashedPassword = await this.hashPassword(createUserDto.password)
    createUserDto.password = hashedPassword;

    const newUser = await this.userRepo.create(createUserDto);
    
    delete newUser.password;
    return newUser;
  }

  async find(filterQuery: FilterQuery<UserDocument>){
    return await this.userRepo.findWithOutPaginationData(filterQuery);
  }

  async findAll(filterQuery: FilterQuery<UserDocument>, popOptions?: PopulateOptions[], fields?: string[]) {
    if(fields){
      fields = [...fields, '-password']
    }else{
      fields = ['-password']
    }
    return await this.userRepo.find(filterQuery, popOptions, fields);
  }

  async findOne(filterQuery: FilterQuery<UserDocument>, popOptions?: PopulateOptions[], fields?: string[]) {
    if(fields){
      fields = [...fields, '-password']
    }else{
      fields = ['-password']
    }
    return await this.userRepo.findOne(filterQuery, popOptions, fields);
  }

  async findUserWithPass(filterQuery: FilterQuery<UserDocument>, popOptions?: PopulateOptions[], fields?: string[]) {
    return await this.userRepo.findOne(filterQuery, popOptions, fields);
  }


  async update(filterQuery: FilterQuery<UserDocument>, updateUserDto: UpdateUserDto, popOptions?: PopulateOptions[], fields?: string[]) {
    if(fields){
      fields = [...fields, '-password']
    }else{
      fields = ['-password']
    }

    if(updateUserDto.password){
      const hashedPassword = await this.hashPassword(updateUserDto.password)
      updateUserDto.password = hashedPassword;
      }
    return await this.userRepo.findOneAndUpdate(filterQuery, updateUserDto, popOptions, fields);
  }

  async remove(filterQuery: FilterQuery<UserDocument>) {
    return await this.userRepo.findOneAndDelete(filterQuery);
  }
}
