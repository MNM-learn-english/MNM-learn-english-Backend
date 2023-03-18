import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { Lecture } from "src/lecture/entities/lecture.entity";
import { User } from "src/user/entities/user.entity";
import { VocabStatus } from "src/vocabulary/dto/vocab-status-enum";
import { Vocabulary } from "src/vocabulary/entities/vocabulary.entity";

export class CreateUserVocabMemoryDto {
    @IsString()
    @IsNotEmpty()
    user: User;

    @IsString()
    @IsNotEmpty()
    vocabulary: Vocabulary;

    @IsString()
    @IsNotEmpty()
    lecture: Lecture;

    @IsString()
    @IsNotEmpty()
    category: Category;

}
