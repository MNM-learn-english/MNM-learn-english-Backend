import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { AuthGuard } from 'src/guards/auth.guard';



@UseGuards(AuthGuard)
@Controller()
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  create(@Body() createVocabularyDto: CreateVocabularyDto, @Param('categoryId') categoryId: string ,@Param('lectureId') lectureId: string) {
    return this.vocabularyService.create(createVocabularyDto, categoryId, lectureId);
  }

  @Get()
  findAll(@Param('categoryId') categoryId: string ,@Param('lectureId') lectureId: string) {
    return this.vocabularyService.findAll(categoryId, lectureId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vocabulary = await this.vocabularyService.findOne(id);
    if(!vocabulary){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocabulary;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
    const vocabulary = await this.vocabularyService.update(id, updateVocabularyDto);
    if(!vocabulary){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocabulary;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const vocab = await this.vocabularyService.remove(id);
    if(!vocab){
      throw new NotFoundException('Vocabulary not found!')
    }
    return vocab;
  }
}
