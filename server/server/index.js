const qs = require('qs');
const express = require('express');
const bodyParser = require('body-parser');
const httpsRedirect = require('express-https-redirect');
const logger = require('./utils/logger');
const config = require('../config');
const routes = require('./routes');
const { cors: corsMiddleware, errorHandler } = require('./middlewares');

const app = express();


// We need this to receive the merchant id as filters for deals
app.set('query parser', str => qs.parse(str, { arrayLimit: 100 }));

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

if (config.web.https === true) {
  app.use('/', httpsRedirect());
}

app.use(corsMiddleware('*'));
app.use(logger.expressMiddleware());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.use(errorHandler({ logger }));


module.exports = app;
