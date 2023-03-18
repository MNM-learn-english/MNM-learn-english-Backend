import { Test, TestingModule } from '@nestjs/testing';
import { UserVocabMemoryService } from './user-vocab-memory.service';

describe('UserVocabMemoryService', () => {
  let service: UserVocabMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVocabMemoryService],
    }).compile();

    service = module.get<UserVocabMemoryService>(UserVocabMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
