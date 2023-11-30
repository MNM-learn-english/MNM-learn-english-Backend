import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './model/category.schema';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDocument> {
    return this.categoryRepo.create(createCategoryDto)
  }

  async findAll(filterQuery: FilterQuery<CategoryDocument>){
    return await this.categoryRepo.find(filterQuery);
  }

  async findOne(_id: string): Promise<CategoryDocument> {
    return await this.categoryRepo.findOne({_id});
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDocument> {
    return await this.categoryRepo.findOneAndUpdate({_id}, updateCategoryDto)
  }

  async remove(_id: string) {
    return await this.categoryRepo.findOneAndDelete({_id});
  }
}
