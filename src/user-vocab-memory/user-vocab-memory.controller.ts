import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UserVocabMemoryService } from './user-vocab-memory.service';
import { CreateUserVocabMemoryDto } from './dto/create-user-vocab-memory.dto';
import { AuthGuard } from 'src/guards/auth.guard';



@UseGuards(AuthGuard)
@Controller()
export class UserVocabMemoryController {
  constructor(private readonly userVocabMemoryService: UserVocabMemoryService) {}

  @Post()
  async create(
    @Param('categoryId') categoryId: string,
    @Param('lectureId') lectureId: string,
    @Body() createUserVocabMemoryDto: CreateUserVocabMemoryDto) {
    return await this.userVocabMemoryService.create(createUserVocabMemoryDto,categoryId, lectureId);
  }

  @Get()
  async findAll(
    @Param('categoryId') categoryId: string,
    @Param('lectureId') lectureId: string,
  ) {
    return await this.userVocabMemoryService.findAll(categoryId, lectureId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userVocabMem = await this.userVocabMemoryService.findOne(id);
    if(!userVocabMem){
      throw new NotFoundException('Not Found!')
    }
    return userVocabMem;
  }

  @Patch(':id/correct')
  async updateCorrect(@Param('id') id: string) {
    const userVocabMem = await this.userVocabMemoryService.updateCorrect(id);
    return userVocabMem;
  }

  @Patch(':id/wrong')
  async updateWrong(@Param('id') id: string){
    const userVocabMem = await this.userVocabMemoryService.updateWrong(id);
    return userVocabMem;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userVocabMem = await this.userVocabMemoryService.remove(id);
    if(!userVocabMem){
      throw new NotFoundException('Not Found!');
    }
    return userVocabMem;
  }
}
