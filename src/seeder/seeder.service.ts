import { Injectable } from '@nestjs/common';
import { UserLevelEnum } from 'src/user/dto/user-level-interface';
import { UserRoleEnum } from 'src/user/dto/user-role-enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeederService {
    constructor(
        private readonly userService: UserService
    ){}


    async initAdmin(){
        console.log("seed Admin")
        const admins = await this.userService.find({role: UserRoleEnum.admin});
        if(admins.length === 0){
            // create new admin
            await this.userService.create({
                "userName": "mohamadhasan",
                "mobileNumber": "+989142371302",
                "email": "tbz.mohamadhasanT@yahoo.com",
                "password": "95440012WEek",
                "avatar": "avatar.png",
                "level": UserLevelEnum.upperIntermediate,
                "role": UserRoleEnum.admin
            })
        }
    }
}
