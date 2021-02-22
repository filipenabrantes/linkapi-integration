import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Pidrive 🔗 Bling integration')
    .setDescription('APIs integration - Pipedrive and Bling')
    .setVersion('1.0')
    .addTag('order')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  Logger.log(`🔥 Server running on port 3000`);
}
bootstrap();
