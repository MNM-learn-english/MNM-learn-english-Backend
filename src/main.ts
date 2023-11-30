import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

const cookieSession = require("cookie-session");


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });




  const seeder = app.get(SeederService);
  seeder.initAdmin();  
  app.use(cookieSession({
    keys: ["token"]
  }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
