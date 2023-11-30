import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { VocabularyService } from '../vocabulary.service';
import { CreateVocabularyDto } from '../dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from '../dto/update-vocabulary.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/role.decorator';
import { FilterQuery } from 'mongoose';
import { VocabularyDocument } from '../model/vocabulary.schema';



@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('crm/vocabulary')
export class CrmVocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}


  @Roles('Admin')
  @Post()
  async create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return await this.vocabularyService.create(createVocabularyDto);
  }

  @Roles('Admin')
  @Get()
  async findAll(
    @Query() filterQuery: FilterQuery<VocabularyDocument>
  ) {
    return await this.vocabularyService.findAll(filterQuery);
  }

  @Roles('Admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vocabulary = await this.vocabularyService.findOne(id);
    if(!vocabulary){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocabulary;
  }


  @Roles('Admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
    const vocabulary = await this.vocabularyService.update(id, updateVocabularyDto);
    if(!vocabulary){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocabulary;
  }

  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const vocab = await this.vocabularyService.remove(id);
    if(!vocab){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocab;
  }
}
