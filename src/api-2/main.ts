import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';

const logger = new Logger('api-2/main.ts');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const path = join(__dirname, 'static');
  logger.log(path);
  app.useStaticAssets(path);

  await app.listen(3002);
}
bootstrap();
