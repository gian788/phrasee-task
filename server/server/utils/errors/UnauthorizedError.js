const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');

/**
  Class UnauthorizedError
  @extends RestResponseError
*/
class UnauthorizedError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg) {
    super(msg, errorCodes.unauthorized);
  }
}

module.exports = UnauthorizedError;
