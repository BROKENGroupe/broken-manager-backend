export const HttpErrors = {
    BAD_REQUEST: { code: 400, message: 'Solicitud inválida.' },
    UNAUTHORIZED: { code: 401, message: 'No autorizado.' },
    PAYMENT_REQUIRED: { code: 402, message: 'Pago requerido.' },
    FORBIDDEN: { code: 403, message: 'Acceso prohibido.' },
    NOT_FOUND: { code: 404, message: 'Recurso no encontrado.' },
    METHOD_NOT_ALLOWED: { code: 405, message: 'Método no permitido.' },
    NOT_ACCEPTABLE: { code: 406, message: 'No aceptable.' },
    PROXY_AUTH_REQUIRED: { code: 407, message: 'Se requiere autenticación del proxy.' },
    REQUEST_TIMEOUT: { code: 408, message: 'Tiempo de espera agotado.' },
    CONFLICT: { code: 409, message: 'Conflicto en la solicitud.' },
    GONE: { code: 410, message: 'Recurso no disponible.' },
    LENGTH_REQUIRED: { code: 411, message: 'Longitud requerida.' },
    PRECONDITION_FAILED: { code: 412, message: 'Precondición fallida.' },
    PAYLOAD_TOO_LARGE: { code: 413, message: 'El tamaño del contenido excede el límite permitido.' },
    URI_TOO_LONG: { code: 414, message: 'La URI solicitada es demasiado larga.' },
    UNSUPPORTED_MEDIA_TYPE: { code: 415, message: 'Tipo de medio no soportado.' },
    RANGE_NOT_SATISFIABLE: { code: 416, message: 'Rango solicitado no satisfactorio.' },
    EXPECTATION_FAILED: { code: 417, message: 'Fallo en la expectativa.' },
    UNPROCESSABLE_ENTITY: { code: 422, message: 'Entidad no procesable.' },
    TOO_MANY_REQUESTS: { code: 429, message: 'Demasiadas solicitudes.' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Error interno del servidor.' },
    NOT_IMPLEMENTED: { code: 501, message: 'No implementado.' },
    BAD_GATEWAY: { code: 502, message: 'Puerta de enlace incorrecta.' },
    SERVICE_UNAVAILABLE: { code: 503, message: 'Servicio no disponible.' },
    GATEWAY_TIMEOUT: { code: 504, message: 'Tiempo de espera de la puerta de enlace agotado.' },
    HTTP_VERSION_NOT_SUPPORTED: { code: 505, message: 'Versión HTTP no soportada.' },
    EMAIL_ALREADY_REGISTERED: { code: 400, message: 'Este correo ya está registrado.' },
  };

  export const HttpSuccess = {
    OK: { code: 200, message: 'Solicitud exitosa.' },
    CREATED: { code: 201, message: 'Recurso creado exitosamente.' },
    UPDATE: { code: 201, message: 'Recurso actualizado exitosamente.' },
    DELETE: { code: 201, message: 'Recurso eliminado exitosamente.' },
    ACCEPTED: { code: 202, message: 'Solicitud aceptada para procesamiento.' },
    NO_CONTENT: { code: 204, message: 'Sin contenido.' },
    PARTIAL_CONTENT: { code: 206, message: 'Contenido parcial.' },
  };