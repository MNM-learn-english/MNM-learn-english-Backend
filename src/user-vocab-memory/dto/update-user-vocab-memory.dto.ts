import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { CreateUserVocabMemoryDto } from './create-user-vocab-memory.dto';

export class UpdateUserVocabMemoryDto extends PartialType(CreateUserVocabMemoryDto) {
}
