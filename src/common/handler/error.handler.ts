import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch() // Captura cualquier excepción
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      // Obtener el estado HTTP
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      // Obtener el mensaje del error
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: exception.message || 'Internal server error' };
  
      // Estructura de respuesta estándar
      const errorResponse = {
        statusCode: status,
        errorName: exception.name || 'Exception',
        message: typeof message === 'string' ? message : message,
        timestamp: new Date().toISOString(),
      };
  
      console.error(`[Error]: ${JSON.stringify(errorResponse)}`); // Log del error en consola
  
      // Responder al frontend con el formato definido
      response.status(status).json(errorResponse);
    }
  }
  