import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import { CategoryModule } from './category/category.module';
// import { LectureModule } from './lecture/lecture.module';
// import { VocabularyModule } from './vocabulary/vocabulary.module';
// import { UserVocabMemoryModule } from './user-vocab-memory/user-vocab-memory.module';
import { CurrentUserMiddleWare } from './user/middlewares/current-user-middleware';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './libs/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    UserModule,
    // CategoryModule,
    // LectureModule,
    // VocabularyModule,
    // UserVocabMemoryModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
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
