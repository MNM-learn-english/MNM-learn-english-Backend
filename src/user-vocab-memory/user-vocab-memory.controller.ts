import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UserVocabMemoryService } from './user-vocab-memory.service';
import { CreateUserVocabMemoryDto } from './dto/create-user-vocab-memory.dto';
import { AuthGuard } from 'src/guards/auth.guard';



@UseGuards(AuthGuard)
@Controller('user-vocab-memory')
export class UserVocabMemoryController {
  constructor(private readonly userVocabMemoryService: UserVocabMemoryService) {}

  @Post()
  async create(
    @Body() createUserVocabMemoryDto: CreateUserVocabMemoryDto) {
    return await this.userVocabMemoryService.create(createUserVocabMemoryDto);
  }

  @Get()
  async findAll(
  ) {
    return await this.userVocabMemoryService.findAll();
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
