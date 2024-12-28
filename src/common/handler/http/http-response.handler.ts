import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseDto } from '../http/http-response.dto';
import { HttpErrors } from './http-errors-constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determinar el estado HTTP
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Obtener el mensaje basado en la excepción o usar un mensaje por defecto
    let error = HttpErrors.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const exceptionMessage = typeof response === 'string' ? response : response['message'];

      // Buscar el error basado en el código
      const customError = Object.values(HttpErrors).find(e => e.message === exceptionMessage);
      if (customError) {
        error = customError;
      } else {
        error = { code: status, message: exceptionMessage };
      }
    }

    const errorResponse: ErrorResponseDto = {
      success: false,
      statusCode: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Responder al frontend con el DTO de error
    response.status(error.code).json(errorResponse);
  }
}