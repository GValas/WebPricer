import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api-exception.model';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = error.getStatus();

    if (status !== HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== 'string') {
        error.response['message'] = error.response.message || 'you do not have permission';
      }
    }

    const exception: ApiException = {
      statusCode: status,
      error: error.response.name || error.name,
      message: error.response.message || error.message,
      errors: error.response.meserrorssage || error.errors,
      timestamp: new Date().toISOString(),
      path: req ? req.url : null,
    };

    res.status(status).json(exception);
  }
}
