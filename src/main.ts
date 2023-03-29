import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Movies api')
    .setDescription(
      `this api will perform movie crud operation.
                     all success responses have response body as following,
                      {
                      "statusCode": 201,
                      "status": true,
                      "timestamp": "2023-03-29T12:23:33.393Z",
                      "message": "",
                      "data": {}
                    } 
                    all error responses have following response body,
                    {
                      "statusCode": 500,
                      "success": false,
                      "timeStamp": "2023-03-29T12:21:29.571Z",
                      "error": [
                          "this is a error "
                      ]
                    }`,
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(3000);
}
bootstrap();
