import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserLevelEnum } from "src/user/dto/user-level-interface";

export class CreateLectureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(UserLevelEnum)
    @IsNotEmpty()
    level: UserLevelEnum;

    @IsString()
    description: string;

    @IsString()
    avatar: string;
}
