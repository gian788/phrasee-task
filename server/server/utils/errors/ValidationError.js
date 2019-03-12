const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');

/**
  Class ValidationError
  @extends RestResponseError
*/
class ValidationError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg) {
    super(msg, errorCodes.validationError);
  }
}

module.exports = ValidationError;
