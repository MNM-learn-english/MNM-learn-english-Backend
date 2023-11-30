import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
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

    @IsEnum(VocabTypeEnum)
    type: VocabTypeEnum;

    @IsString()
    @IsNotEmpty()
    meaning: string;

    @IsString()
    lecture: string;

    @IsString()
    category: string;

    @IsOptional()
    @IsBoolean()
    isParent: boolean;

    @IsOptional()
    @IsString()
    parent: string;

}
