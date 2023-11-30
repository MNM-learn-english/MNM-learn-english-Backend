import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserModule } from 'src/user/user.module';



@Module({
  imports: [UserModule],
  controllers: [],
  providers: [SeederService],
  exports: [SeederService]
})
export class SeederModule {}
