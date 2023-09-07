import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Server is working on port', process.env.PORT)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('RestBaza')
    .setDescription('REST API doc')
    .setVersion('0.0.1')
    .addTag('API tests')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT);
}
bootstrap();
