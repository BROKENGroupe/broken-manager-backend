import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/handler/http/http-response.handler';

async function bootstrap() {
  const appModule = AppModule;
  const appOptions = {cors: true};
  const app = await NestFactory.create(appModule, appOptions);
  // Configura el filtro de excepciones como global
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
