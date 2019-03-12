const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');

/**
  Class ForbiddenError
  @extends RestResponseError
*/
class ForbiddenError extends RestResponseError {
  /**
    @param {String} msg error message
  */
  constructor(msg = 'User is not allowed to access this resource') {
    super(msg, errorCodes.forbidden);
  }
}

module.exports = ForbiddenError;
