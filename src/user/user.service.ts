import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    let newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async find(email: string){
    return await this.userModel.find({email}).exec();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // find user
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto,{new: true}).exec();
    if(!user){
      throw new NotFoundException('User Not Found!')
    }

    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
