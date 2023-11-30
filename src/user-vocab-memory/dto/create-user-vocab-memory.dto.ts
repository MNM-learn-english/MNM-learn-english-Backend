import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { VocabStatus } from "src/vocabulary/dto/vocab-status-enum";

export class CreateUserVocabMemoryDto {
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    vocabulary: string;

}
