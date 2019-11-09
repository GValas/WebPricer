import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './config/secrets/private-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './config/secrets/public-certificate.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors();

  await app.listen(config.port);
}
bootstrap();
