import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularySchema } from './entities/vocabulary.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Vocabulary', schema: VocabularySchema}])
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService]
})
export class VocabularyModule {}
