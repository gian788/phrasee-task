const freeze = require('deep-freeze-strict');

module.exports = freeze({
  badRequest: {
    statusCode: 400,
    code: 'BAD REQUEST',
    description: 'request malformed or with wrong arguments',
  },
  unauthorized: {
    statusCode: 401,
    code: 'UNAUTHORIZED',
    description: 'requires authorization',
  },
  validationError: {
    statusCode: 422,
    code: 'VALIDATION_ERROR',
    description: 'validation error',
  },
  forbidden: {
    statusCode: 403,
    code: 'FORBIDDEN',
    description: 'action forbidden',
  },
  notFound: {
    statusCode: 404,
    code: 'NOT FOUND',
    description: 'resource not found',
  },
  internalServerError: {
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    description: 'internal server error',
  },
  illegalArgumentError: {
    statusCode: 500,
    code: 'ILLEGAL_ARGUMENT_ERROR',
    description: 'illegal argument error',
  },
});
