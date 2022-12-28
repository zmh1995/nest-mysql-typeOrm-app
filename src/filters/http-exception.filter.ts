// src/filters/http-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { execPath } from 'process';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    // const exceptionResponse: any = exception.getResponse();
    // let validatorMessage = exceptionResponse;
    // if (typeof validatorMessage === 'object') {
    //   validatorMessage = exceptionResponse.message[0];
    // }

    response.status(status).json({
      code: status,
      message: message,
    });
  }
}
