const qs = require('querystring');
const find = require('lodash.find');
const responseErrorCodes = require('./responseErrorCodes');

const errorFromCode = statusCode => find(responseErrorCodes, { statusCode: statusCode });

module.exports = class HTTPError extends Error {
  constructor(serviceName, requestOptions = {}, response, err) {
    super();
    this.serviceName = serviceName || 'UNKNOWN SERVICE';
    this.originalErr = err;
    this.options = requestOptions;
    this.response = response;
    this.responseStatusCode = response ? response.statusCode : null;
    this.responseTextCode = this.toTextCode();

    if (!this.options.method) {
      this.options.method = 'GET';
    }
    this.message = this.getMessage();
  }

  toTextCode() {
    const err = errorFromCode(this.responseStatusCode);
    if (err) {
      return err.code;
    }
    return this.originalErr ? this.originalErr.code : null;
  }

  toDescription() {
    const err = errorFromCode(this.responseStatusCode);
    if (err) {
      return err.description;
    }
    return this.originalErr ? this.originalErr.description : null;
  }

  formatUrlString() {
    if (!this.options.url) {
      return null;
    }
    let logUrl = this.options.url;
    if (this.options.method === 'GET' &&
      this.options.qs && Object.keys(this.options.qs).length) {
      logUrl += `?${qs.stringify(this.options.qs)}`;
    }
    return logUrl;
  }

  getMessage() {
    let msg;
    switch (this.responseTextCode) {
      case 'ETIMEDOUT':
        msg = this.serviceName + (this.originalErr.connect ?
          ' it did not complete the request on time (connect: true)' :
          ' it is not responding (connect: false)');
        break;
      default:
        msg = this.serviceName;
        break;
    }

    if (this.options.url) {
      msg += ` - ${this.options.method} "${this.formatUrlString()}"`;
    }
    if (this.responseStatusCode || this.responseTextCode) {
      msg += ` ${this.responseStatusCode || this.responseTextCode}.`;
    }
    if (this.originalErr) {
      let renderError;
      if (this.originalErr instanceof Error) {
        renderError = this.originalErr;
      } else {
        renderError = typeof this.originalErr === 'object' ?
          JSON.stringify(this.originalErr) :
          this.originalErr;
      }
      msg += ` Response Body: ${renderError}`;
    }
    return msg;
  }

  toObject() {
    return {
      msg: this.serviceName,
      statusCode: this.responseStatusCode,
      code: this.responseTextCode,
      method: this.options.method,
      url: this.options.url,
      href: this.formatUrlString(),
      asString: this.toString(),
      description: this.toDescription(),
    };
  }

  toString() {
    return `HTTPError: ${this.message}`;
  }
};
