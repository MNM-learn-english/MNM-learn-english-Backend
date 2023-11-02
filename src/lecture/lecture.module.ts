import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureSchema } from './entities/lecture.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Lecture', schema: LectureSchema}])
  ],
  controllers: [LectureController],
  providers: [LectureService]
})
export class LectureModule {}
