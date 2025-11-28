import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    credentials: true,
    origin: process.env.NEXT_CLIENT_URL ?? 'http://localhost:3000',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
