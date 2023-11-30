import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { LectureService } from '../lecture.service';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { UpdateLectureDto } from '../dto/update-lecture.dto';
import {} from "@nestjs/common"
import { AuthGuard } from 'src/guards/auth.guard';
import { FilterQuery } from 'mongoose';
import { LectureDocument } from '../model/lecture.schema';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/role.decorator';



@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('crm/lecture')
export class CrmLectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Roles('Admin')
  @Post()
  async create(@Body() createLectureDto: CreateLectureDto) {
    return await this.lectureService.create(createLectureDto);
  }

  @Roles('Admin')
  @Get()
  async findAll(
    @Query() filterQuery: FilterQuery<LectureDocument>
  ) {
    return await this.lectureService.findAll(filterQuery);
  }

  @Roles('Admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lectureService.findOne(id);
  }

  @Roles('Admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    const lecture = await this.lectureService.update(id, updateLectureDto);
    if(!lecture){
      throw new NotFoundException('lecture not found!')
    }
    return lecture;
  }


  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const lecture = await this.lectureService.remove(id);
    if(!lecture){
      throw new NotFoundException('lecture not found!')

    }
    return lecture;
  }
}
