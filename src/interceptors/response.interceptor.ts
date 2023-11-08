import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

export interface HttpRestfulResponse<T> {
  data: T;
  success: boolean;
  message: string;
  statusCode: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, HttpRestfulResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpRestfulResponse<T>> {
    const { statusCode } = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) => ({
        data,
        success: true,
        message: '',
        statusCode: statusCode.toString(),
      })),
    );
  }
}
