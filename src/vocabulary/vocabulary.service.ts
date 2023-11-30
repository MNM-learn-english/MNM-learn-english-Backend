import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyRepository } from './vocabulary.repository';
import { VocabularyDocument } from './model/vocabulary.schema';



@Injectable()
export class VocabularyService {
  constructor(
    private readonly vocabRepo: VocabularyRepository
  ){}

  async create(createVocabularyDto: CreateVocabularyDto): Promise<VocabularyDocument> {
    return await this.vocabRepo.create(createVocabularyDto);
  }

  async findAll(filterQuery: FilterQuery<VocabularyDocument>) {
    return await this.vocabRepo.find(filterQuery);
  }

  async find(filterQuery: FilterQuery<VocabularyDocument>) {
    return await this.vocabRepo.findWithOutPaginationData(filterQuery);
  }

  async findOne(_id: string): Promise<VocabularyDocument> {
    return await this.vocabRepo.findOne({_id});
  }

  async update(_id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<VocabularyDocument> {
    return await this.vocabRepo.findOneAndUpdate({_id}, updateVocabularyDto);
  }

  async remove(_id: string) {
    return await this.vocabRepo.findOneAndDelete({_id});
  }
}
