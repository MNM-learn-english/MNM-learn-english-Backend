import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { Lecture } from "src/lecture/entities/lecture.entity";
import { UserLevelEnum } from "src/user/dto/user-level-interface";
import { VocabStatus } from "./vocab-status-enum";
import { VocabTypeEnum } from "./vocab-type-enum";

export class CreateVocabularyDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    pronounce: string;

    @IsString()
    @IsNotEmpty()
    translationFa: string;


    @IsString()
    @IsNotEmpty()
    avatar: string;

    @IsString()
    @IsNotEmpty()
    example: string;

    @IsString()
    level: UserLevelEnum;

    @IsString()
    type: VocabTypeEnum;

    @IsString()
    @IsNotEmpty()
    meaning: string;


}
