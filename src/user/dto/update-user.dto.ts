import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserLevelEnum } from './user-level-interface';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    avatar?: string;
    userName?: string;
    password?: string;
    email?: string;
    level?: UserLevelEnum;
}
