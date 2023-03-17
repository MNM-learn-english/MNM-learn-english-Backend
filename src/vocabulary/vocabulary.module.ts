import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';

@Module({
  controllers: [VocabularyController],
  providers: [VocabularyService]
})
export class VocabularyModule {}
