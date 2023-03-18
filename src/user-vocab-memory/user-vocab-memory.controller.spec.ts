import { Test, TestingModule } from '@nestjs/testing';
import { UserVocabMemoryController } from './user-vocab-memory.controller';
import { UserVocabMemoryService } from './user-vocab-memory.service';

describe('UserVocabMemoryController', () => {
  let controller: UserVocabMemoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVocabMemoryController],
      providers: [UserVocabMemoryService],
    }).compile();

    controller = module.get<UserVocabMemoryController>(UserVocabMemoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
