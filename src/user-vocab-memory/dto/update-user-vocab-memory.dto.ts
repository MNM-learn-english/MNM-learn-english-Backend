import { PartialType } from '@nestjs/mapped-types';
import { CreateUserVocabMemoryDto } from './create-user-vocab-memory.dto';

export class UpdateUserVocabMemoryDto extends PartialType(CreateUserVocabMemoryDto) {
}
