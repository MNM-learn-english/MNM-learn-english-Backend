import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureDocument, LectureSchema } from './model/lecture.schema';
import { CrmLectureController } from './controller/crm.lecture.controller';
import { PanelLectureController } from './controller/panel.lecture.controller';
import { LectureRepository } from './lecture.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: LectureDocument.name, schema: LectureSchema}])
  ],
  controllers: [CrmLectureController, PanelLectureController],
  providers: [LectureService, LectureRepository]
})
export class LectureModule {}
