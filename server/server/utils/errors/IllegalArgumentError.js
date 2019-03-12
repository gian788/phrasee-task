const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');


/**
  Class IllegalArgumentError
  @extends IllegalArgumentError
*/
class IllegalArgumentError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg) {
    super(msg, errorCodes.illegalArgumentError);
  }
}

module.exports = IllegalArgumentError;
