const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');

/**
  Class NotFoundError
  @extends RestResponseError
*/
class NotFoundError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg) {
    super(msg, errorCodes.notFound);
  }
}

module.exports = NotFoundError;
