import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { UserLevelEnum } from "src/user/dto/user-level-interface";

export class CreateLectureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    level: UserLevelEnum;

    @IsArray()
    videos: string[];

    @IsString()
    context: string;

    @IsString()
    avatar: string;

    @IsString()
    category: Category;
}
