import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CrmAuthController } from './controller/crm-auth.controller';
import { PanelAuthController } from './controller/panel-auth.controller';

@Module({
  imports: [
    UserModule
  ],
  controllers: [CrmAuthController, PanelAuthController],
  providers: [AuthService]
})
export class AuthModule {}
