import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import {NotFoundException} from "@nestjs/common"



@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  create(@Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.create(createLectureDto);
  }

  @Get()
  findAll() {
    return this.lectureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    const lecture = await this.lectureService.update(id, updateLectureDto);
    if(!lecture){
      throw new NotFoundException('lecture not found!')
    }
    return lecture;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const lecture = await this.lectureService.remove(id);
    if(!lecture){
      throw new NotFoundException('lecture not found!')

    }
    return lecture;
  }
}
