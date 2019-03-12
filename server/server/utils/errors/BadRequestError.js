const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');


/**
  Class BadRequestError
  @extends RestResponseError
*/
class BadRequestError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg) {
    super(msg, errorCodes.badRequest);
  }
}

module.exports = BadRequestError;
