import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LectureService } from '../lecture.service';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { UpdateLectureDto } from '../dto/update-lecture.dto';
import {NotFoundException} from "@nestjs/common"
import { AuthGuard } from 'src/guards/auth.guard';
import { LectureDocument } from '../model/lecture.schema';
import { FilterQuery } from 'mongoose';



@UseGuards(AuthGuard)
@Controller('panel/lecture')
export class PanelLectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  findAll(
    @Query() filterQuery: FilterQuery<LectureDocument>
  ) {
    return this.lectureService.findAll(filterQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureService.findOne(id);
  }

}
