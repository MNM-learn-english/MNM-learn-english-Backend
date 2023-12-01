import { MiddlewareConsumer, Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LectureModule } from './lecture/lecture.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
// import { UserVocabMemoryModule } from './user-vocab-memory/user-vocab-memory.module';
import { CurrentUserMiddleWare } from './user/middlewares/current-user-middleware';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './libs/database';
import { SeederModule } from './seeder/seeder.module';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule as CacheLocal } from './cache/cache.module';
import { EmailModule } from './email/email.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CacheModule.register(
      {
        isGlobal: true,
        // @ts-ignore
        store: async () => await redisStore({
          // Store-specific configuration:
          socket: {
            host: 'redis',
            port: 6379,
          }
        })
      }
    ),
    DatabaseModule,
    UserModule,
    LectureModule,
    CategoryModule,
    VocabularyModule,
    CacheLocal,
    // UserVocabMemoryModule,
    AuthModule,
    SeederModule,
    EmailModule
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
