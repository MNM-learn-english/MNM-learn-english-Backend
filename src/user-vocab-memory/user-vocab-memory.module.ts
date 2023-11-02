import { Module } from '@nestjs/common';
import { UserVocabMemoryService } from './user-vocab-memory.service';
import { UserVocabMemoryController } from './user-vocab-memory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserVocabMemorySchema } from './entities/user-vocab-memory.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: "UserVocabMemory", 
          useFactory: () => {
            const schema = UserVocabMemorySchema;
            schema.pre('save', function(){
              this.lastReview = new Date(Date.now());
            })
            return schema
          }
        }
      ]
    )
  ],
  controllers: [UserVocabMemoryController],
  providers: [UserVocabMemoryService]
})
export class UserVocabMemoryModule {}
