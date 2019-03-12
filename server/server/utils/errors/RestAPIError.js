const HTTPError = require('./HTTPError');

module.exports = class RestAPIError extends HTTPError {
  constructor(serviceName, requestOptions, response, error) {
    super(serviceName, requestOptions, response, error);
    this.error = error;
    this.message = this.getMessage();
  }

  toString() {
    return `RestAPIError: ${this.message}`;
  }
};
