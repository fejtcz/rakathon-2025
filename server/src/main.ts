import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  const options = new DocumentBuilder()
    .setTitle('Kovio')
    .setDescription('Popis API pro všechny API endpointy')
    .setVersion('1.0')
    .addTag('kontinuum')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


//  if (!configService.isProduction()) {
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
