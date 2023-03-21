import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VocabStatus } from 'src/vocabulary/dto/vocab-status-enum';
import { CreateUserVocabMemoryDto } from './dto/create-user-vocab-memory.dto';
import { UserVocabMemory, userVocabMermoryDocument } from './entities/user-vocab-memory.entity';

@Injectable()
export class UserVocabMemoryService {
  constructor(@InjectModel('UserVocabMemory') private userVocabMemoryModel: Model<userVocabMermoryDocument>){}
  async create(createUserVocabMemoryDto: CreateUserVocabMemoryDto, category: string, lecture: string): Promise<UserVocabMemory> {

    Object.assign(createUserVocabMemoryDto, {category, lecture});
    const userVocabMemory = new this.userVocabMemoryModel(createUserVocabMemoryDto);
    return await userVocabMemory.save();
  }

  async findAll(category: string, lecture: string) : Promise<UserVocabMemory[]> {
    return await this.userVocabMemoryModel.find({category, lecture}).populate({path:"vocabulary", select: "title"}).exec();
  }

  async findOne(id: string): Promise<UserVocabMemory> {
    return await this.userVocabMemoryModel.findById(id).populate({path:"vocabulary", select: "title"}).exec();
  }

  async updateCorrect(id: string) {
    const userVocabMem = await this.userVocabMemoryModel.findById(id).exec();
    if(!userVocabMem){
      throw new NotFoundException('NotFound!')
    }
    if(userVocabMem.correctAnswer === 2){
      userVocabMem.correctAnswer = 0
      switch (userVocabMem.status) {
        case VocabStatus.new:
          userVocabMem.status = VocabStatus.shortTerm;
          break;
        case VocabStatus.shortTerm:
          userVocabMem.status = VocabStatus.intermediate;
          break;
        case VocabStatus.intermediate:
          userVocabMem.status = VocabStatus.longTerm
        default:
          break;
      }
    }else{
      userVocabMem.correctAnswer = userVocabMem.correctAnswer + 1; 
    }
    return await userVocabMem.save();
  }

  async updateWrong(id: string){
    const userVocabMem = await this.userVocabMemoryModel.findById(id).exec();
    if(!userVocabMem){
      throw new NotFoundException('NotFound!')
    }
    userVocabMem.correctAnswer = 0;
    return await userVocabMem.save();
  }

  async remove(id: string) {
    return await this.userVocabMemoryModel.findByIdAndDelete(id);
  }
}
