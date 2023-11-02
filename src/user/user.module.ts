import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CrmUserController } from './controller/crm-user.controller';
import { UserDocument, UserSchema } from './model/user.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user-interceptor';
import { DatabaseModule } from 'src/libs/database';
import { UserRepository } from './user.repository';
import { panelUserController } from './controller/panel-user.controller';

@Module({
  imports: [
    DatabaseModule.forFeature([{name: UserDocument.name, schema: UserSchema}]),
  ],
  controllers: [
    CrmUserController,
    panelUserController
  ],
  providers: [
    UserRepository,
    UserService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ],
  exports:[UserService]
})
export class UserModule {
}
