import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const method = request.method;
    if (status === 500 || status === 403) {
      //handle internal server error
      return response.status(status).json({
        statusCode: status,
        success: false,
        timeStamp: new Date(),
        error: [exception.message],
      });
    } else {
      response.status(status).json({
        statusCode: status,
        success: false,
        timeStamp: new Date(),
        error: [exception.response],
      });
    }
  }
}
