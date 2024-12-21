import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const appModule = await AppModule.forRoot(); // Carga del módulo dinámico
  // const app = await NestFactory.create(appModule.module);
  // await app.listen(3000);
  const appModule = await AppModule;
  const appOptions = {cors: true};
  const app = await NestFactory.create(appModule, appOptions);
  //app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
