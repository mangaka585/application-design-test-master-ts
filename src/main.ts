import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { validationPipe } from './common/validation/validation.pipe';
import { createOpenApi } from './common/swagger/open-api-creator';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const restPort = process.env['PORT'];
  const host = process.env['HOST'];

  app.useGlobalPipes(validationPipe);
  app.disable('x-powered-by');

  createOpenApi(app);

  await app.listen(restPort);

  Logger.log(`Server listening on ${host}:${restPort}`, 'CORE');
}
bootstrap();
