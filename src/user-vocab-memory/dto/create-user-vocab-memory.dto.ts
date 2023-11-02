import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { Lecture } from "src/lecture/entities/lecture.entity";
import { UserDocument } from "src/user/model/user.schema";
import { VocabStatus } from "src/vocabulary/dto/vocab-status-enum";
import { Vocabulary } from "src/vocabulary/entities/vocabulary.entity";

export class CreateUserVocabMemoryDto {
    @IsString()
    @IsNotEmpty()
    user: UserDocument;

    @IsString()
    @IsNotEmpty()
    vocabulary: Vocabulary;

}
