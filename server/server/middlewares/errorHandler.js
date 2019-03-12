const {
  InternalServerError,
  RestResponseError,
  HTTPError,
  HTTPErrorResponse,
  responseErrorCodes,
} = require('../utils/errors');

const defaultError = responseErrorCodes.internalServerError;
const minErrorCode = responseErrorCodes.internalServerError.statusCode;
const inDevelopment = process.env.NODE_ENV === 'development';


const getLogMethodDefault = ({ statusCode }) => (statusCode >= minErrorCode ? 'error' : 'debug');

module.exports = function errorHandler(options) {
  const {
    logger,
    getLogMethod = getLogMethodDefault,
  } = options;

  return function (err, req, res, next) { // eslint-disable-line
    let responseError;
    let logMessage = `Error on request ${req.method} ${req.originalUrl}`;

    if (err instanceof RestResponseError) {
      responseError = err;
    } else if (err instanceof HTTPError) {
      responseError = new HTTPErrorResponse(err);
    } else {
      // use the real message if we're in development mode
      // (otherwise it's just an 'internal server error')
      const msg = inDevelopment ? err.message : defaultError.description;
      responseError = new InternalServerError(msg);
    }

    const {
      statusCode,
      code,
      description,
      message,
      details,
    } = responseError;
    const logMethod = getLogMethod(responseError, err);
    const errBody = {
      code,
      description,
    };
    if (message) {
      errBody.message = message;
    }
    if (details) {
      errBody.details = details;
    }
    if (inDevelopment) {
      errBody.stack = err.stack;
    }

    if (req.get('Referrer')) {
      logMessage += ` (referrer: '${req.get('Referrer')}')`;
    }
    logMessage += ` - ${err}`;
    logger[logMethod](logMessage);

    res.status(statusCode);
    res.send({
      error: errBody,
    });
  };
};

module.exports.getLogMethodDefault = getLogMethodDefault;
