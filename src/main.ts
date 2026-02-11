import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin : "http://localhost:3000",
    credentials : true,
  });
  app.use(cookieParser())
  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  })
  app.useGlobalPipes(validationPipe);
  await app.listen(process.env.PORT ?? 3001);
  
}
bootstrap();
