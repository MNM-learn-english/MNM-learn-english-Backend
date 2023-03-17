import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './user/interceptors/current-user-interceptor';
import { LectureModule } from './lecture/lecture.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>{
        console.log(configService.get<string>('MONGODB_URI'))
        return {
          uri: configService.get<string>('MONGODB_URI')
        } 

      } 
    }),
    UserModule,
    CategoryModule,
    LectureModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    
  ],
})
export class AppModule {}
