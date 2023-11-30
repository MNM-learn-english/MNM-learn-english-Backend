import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { VocabularyService } from '../vocabulary.service';
import { CreateVocabularyDto } from '../dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from '../dto/update-vocabulary.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilterQuery } from 'mongoose';
import { VocabularyDocument } from '../model/vocabulary.schema';



@UseGuards(AuthGuard)
@Controller('panel/vocabulary')
export class PanelVocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Get()
  async findAll(
    @Query() filterQuery: FilterQuery<VocabularyDocument>
  ) {
    if(
      !filterQuery.lecture ||
      !filterQuery.category
      ){  
        throw new BadRequestException('please choose lecture and category!')
      }
    const parnetVocabs = await this.vocabularyService.findAll({...filterQuery, isParent: true});
    console.log("parnetVocabs", parnetVocabs)
    // get childs and add them
    const vocabWithChilds = await Promise.all(parnetVocabs.data.map(async(parent: VocabularyDocument) => {
      return {
        ...parent,
        childs: await this.vocabularyService.find({parent: parent._id})
      } 
    }));
    return {
      data: vocabWithChilds,
      pagination: parnetVocabs.pagination
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vocabulary = await this.vocabularyService.findOne(id);
    if(!vocabulary){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocabulary;
  }

}
