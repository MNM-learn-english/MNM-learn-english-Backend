import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from '../category.service';
import { FilterQuery } from 'mongoose';
import { LectureDocument } from 'src/lecture/model/lecture.schema';



@UseGuards(AuthGuard)
@Controller('panel/category')
export class PanelCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(
    @Query() filterQuery: FilterQuery<LectureDocument>
  ) {
    return await this.categoryService.findAll(filterQuery);
  }

}
