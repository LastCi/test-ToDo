import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useLogger(Logger);
    app.useGlobalPipes(new ZodValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors()
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
