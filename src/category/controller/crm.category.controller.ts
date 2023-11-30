import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from '../category.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { FilterQuery } from 'mongoose';
import { CategoryDocument } from '../model/category.schema';
import { Roles } from 'src/decorators/role.decorator';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';



@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('crm/category')
export class CrmCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles('Admin')
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }


  @Roles('Admin')
  @Get()
  async findAll(
    @Query() filterQuery: FilterQuery<CategoryDocument>
  ) {
    return await this.categoryService.findAll(filterQuery);
  }

  @Roles('Admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }


  @Roles('Admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(id, updateCategoryDto);
    if(!category){
      throw new NotFoundException('category not found!')
    }
    return category;
  }

  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    const category = this.categoryService.remove(id);
    if(!category){
      throw new NotFoundException('category not found!')
    }
    return category;

  }
}
