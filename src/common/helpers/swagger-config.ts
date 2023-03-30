import { DocumentBuilder } from '@nestjs/swagger';
const successBody = ` {
    "statusCode": 201,
    "status": true,
    "timestamp": "2023-03-29T12:23:33.393Z",
    "message": "",
    "data": {}
  }`;
const errorBody = `{
    "statusCode": 500,
    "success": false,
    "timeStamp": "2023-03-29T12:21:29.571Z",
    "error": [
        "this is a error "
    ]
  }`;
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Movies api')
  .setDescription(
    'This api will perform **movie** crud operations.\n\nresponses have body as following,\n\n- success ```' +
      successBody +
      '``` \n\n - error ```' +
      errorBody +
      '```',
  )
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .setVersion('0.0.1')
  .build();
