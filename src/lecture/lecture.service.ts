import { Injectable } from '@nestjs/common';
import { FilterQuery} from 'mongoose';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { LectureRepository } from './lecture.repository';
import { LectureDocument } from './model/lecture.schema';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureRepo: LectureRepository
  ){}

  async create(createLectureDto: CreateLectureDto): Promise<LectureDocument> {
    return await this.lectureRepo.create(createLectureDto);
  }

  async findAll(filterQuery: FilterQuery<LectureDocument>) {
    return await this.lectureRepo.find(filterQuery);
  }

  async findOne(_id: string) : Promise<LectureDocument>{
    return await this.lectureRepo.findOne({_id})
  }

  async update(_id: string, updateLectureDto: UpdateLectureDto): Promise<LectureDocument> {
    return await this.lectureRepo.findOneAndUpdate({_id}, updateLectureDto)
  }

  async remove(_id: string) {
    return await this.lectureRepo.findOneAndDelete({_id});
  }
}
