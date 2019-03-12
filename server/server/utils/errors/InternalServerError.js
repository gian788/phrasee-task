const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');

/**
  Class InternalServerError
  @extends RestResponseError
*/
class InternalServerError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg) {
    super(msg, errorCodes.internalServerError);
  }
}

module.exports = InternalServerError;
