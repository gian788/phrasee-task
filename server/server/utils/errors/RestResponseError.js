/**
 Class RestResponseError
 @extends Error
*/
class RestResponseError extends Error {
  /**
    @param {String} msg message
    @param {Object} responseParams response params
    @param {String} responseParams.statusCode response status code
    @param {String} responseParams.code error code (usually upper case/snake case)
    @param {String} responseParams.description error description
    @param {Array<Object>} responseParams.details error details
    @param {String} responseParams.details[].code error detail code
    @param {String} responseParams.details[].target error detail target
      (eg. in a validation error the field that fails the validation)
    @param {String} responseParams.details[].message error detail message
  */
  constructor(msg, responseParams) {
    super(msg);

    this.code = responseParams.code;
    this.statusCode = responseParams.statusCode;
    this.description = responseParams.description;
    this.details = responseParams.details;
  }
}

module.exports = RestResponseError;
