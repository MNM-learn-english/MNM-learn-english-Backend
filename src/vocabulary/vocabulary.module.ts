import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CrmVocabularyController } from './controller/crm.vocabulary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularyDocument, VocabularySchema } from './model/vocabulary.schema';
import { VocabularyRepository } from './vocabulary.repository';
import { PanelVocabularyController } from './controller/panel.vocabulary.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: VocabularyDocument.name, schema: VocabularySchema}])
  ],
  controllers: [CrmVocabularyController, PanelVocabularyController],
  providers: [VocabularyService, VocabularyRepository]
})
export class VocabularyModule {}
