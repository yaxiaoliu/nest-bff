import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpRestfulResponse } from 'src/interceptors/response.interceptor';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const result: HttpRestfulResponse<null> = {
      message: exception.message,
      data: null,
      statusCode: statusCode.toString() + '00',
      success: false,
    };

    response.status(statusCode);
    response.send(result);
  }
}
