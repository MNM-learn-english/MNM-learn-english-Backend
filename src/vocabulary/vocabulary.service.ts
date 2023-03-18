import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { Vocabulary, vocabularyDocument } from './entities/vocabulary.entity';

@Injectable()
export class VocabularyService {
  constructor(@InjectModel('Vocabulary') private vocabularyModel: Model<vocabularyDocument>){}

  async create(createVocabularyDto: CreateVocabularyDto): Promise<Vocabulary> {
    const newVocab = new this.vocabularyModel(createVocabularyDto);
    return await newVocab.save();
  }

  async findAll(): Promise<Vocabulary[]> {
    return await this.vocabularyModel.find().exec();
  }

  async findOne(id: string): Promise<Vocabulary> {
    return await this.vocabularyModel.findById(id).exec();
  }

  async update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<Vocabulary> {
    return await this.vocabularyModel.findByIdAndUpdate(id, updateVocabularyDto, {
      new: true
    });
  }

  async remove(id: string) {
    return await this.vocabularyModel.findByIdAndDelete(id);
  }
}
