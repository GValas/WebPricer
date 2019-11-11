import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import * as fs from 'fs';
import * as path from 'path';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './config/secrets/private-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './config/secrets/public-certificate.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app
    .enableCors()
    .use(helmet())
    .use(compression())
    .use(rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.maxRequestPerMs,
    }));

  await app.listen(config.port);
}
bootstrap();
