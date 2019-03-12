const errorCodes = require('./responseErrorCodes');
const RestResponseError = require('./RestResponseError');

const ESOCKETTIMEDOUT = 'ESOCKETTIMEDOUT';
const ETIMEDOUT = 'ETIMEDOUT';

const responseError = errorCodes.internalServerError;
const errorMessage = 'An HTTP error occurred';

/**
  Class HTTPErrorResponse
  @extends RestResponseError
*/
class HTTPErrorResponse extends RestResponseError {
  /**
    @param {HTTPError} httpError error
  */
  constructor(httpError) {
    super(errorMessage, responseError);
    this.httpError = httpError;
    this.details = this.getDetails(httpError);
  }

  getDetails() {
    if (
      this.httpError.responseTextCode === ESOCKETTIMEDOUT ||
      this.httpError.responseTextCode === ETIMEDOUT
    ) {
      return [{
        code: ETIMEDOUT,
        message: `${this.httpError.serviceName} timed out`,
      }];
    }
    return null;
  }
}

module.exports = HTTPErrorResponse;
