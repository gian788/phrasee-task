const allowedMethods = 'GET,PUT,POST,DELETE,OPTIONS';
const allowedHeaders = [
  'Accept-Encoding',
  'Content-Type',
  'Authorization',
  'Content-Length',
  'X-Requested-With',
  'X-Request-ID',
].join(',');


module.exports = (allowedOrigins) => {
  let isOriginAllowed = origin => allowedOrigins.includes(origin);
  if (allowedOrigins === '*') {
    isOriginAllowed = () => true;
  } else if (typeof allowedOrigins === 'string') {
    isOriginAllowed = origin => allowedOrigins.split(/[ ,]+/).includes(origin);
  } else if (!Array.isArray(allowedOrigins)) {
    throw new Error('cors middleware acccept as param: ' +
      ' \'*\', a string of comma separated origins or an array of origins');
  }

  return (req, res, next) => {
    const originHeader = req.headers.origin;
    if (isOriginAllowed(originHeader)) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', originHeader);
      res.header('Access-Control-Allow-Methods', allowedMethods);
      res.header('Access-Control-Allow-Headers', allowedHeaders);
    }

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.status(200);
      res.send();
    } else {
      next();
    }
  };
};
