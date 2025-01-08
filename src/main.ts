import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@common/handlers';

async function bootstrap() {
  const appModule = AppModule;
  const appOptions = {cors: true};
  const app = await NestFactory.create(appModule, appOptions);
  // Configura el filtro de excepciones como global
  //app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
