import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { CurrentUserInterceptor } from './user/interceptors/current-user-interceptor';
import { LectureModule } from './lecture/lecture.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { UserVocabMemoryModule } from './user-vocab-memory/user-vocab-memory.module';
import cookieSession from 'cookie-session';
import { CurrentUserMiddleWare } from './user/middlewares/current-user-middleware';

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
    LectureModule,
    VocabularyModule,
    UserVocabMemoryModule,
    RouterModule.register([{
      path: "category",
      module: CategoryModule,
      children:[
        {
            path: ":categoryId/lecture",
            module: LectureModule,
            children:[
              {
                path: ":lectureId/vocabulary",
                module: VocabularyModule,
              },
              {
                path: ":lectureId/user-vocab-memory",
                module: UserVocabMemoryModule,
              }
            ]
          }
      ]
    }])
    
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(
        CurrentUserMiddleWare
      )
      .forRoutes("*")
  }
}
