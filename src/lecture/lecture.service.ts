import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture, lectureDocument } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(@InjectModel('Lecture') private lectureModel: Model<lectureDocument>){}
  async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
    const newLecture = new this.lectureModel(createLectureDto);
    return await newLecture.save();
  }

  async findAll(): Promise<Lecture[]> {
    return await this.lectureModel.find().populate({path: "category", select: "title"}).exec();
  }

  async findOne(id: string) : Promise<Lecture>{
    return await this.lectureModel.findById(id).populate({path: "category", select: "title"}).exec();
  }

  async update(id: string, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
    return await this.lectureModel.findByIdAndUpdate(id, updateLectureDto, {
      new: true
    });
  }

  async remove(id: string) {
    return await this.lectureModel.findByIdAndDelete(id);
  }
}
