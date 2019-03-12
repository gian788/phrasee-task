const http = require('http');
const logger = require('./server/utils/logger');
const config = require('./config');
const app = require('./server/index');

const { port } = config.web;
const exit = () => setTimeout(() => process.exit(1), 5000);

process.on('uncaughtException', (err) => {
  logger.fatal(`Server has crashed on an unhandled exception. Error message: ${
    err.message || null}. Stack: ${JSON.stringify(err.stack || null)}`);
  exit();
});

process.on('unhandledRejection', (err) => {
  logger.fatal(`Server has crashed on an unhandled promise rejection. Error message: ${
    err.message || null}. Stack: ${JSON.stringify(err.stack || null)}`);
  exit();
});


http
  .createServer(app)
  .listen(port)
  .on('listening', () => logger.info(`Express server listening on port ${port}`))
  .on('error', (error) => {
    logger.error(`Express error: ${error}`);
    exit();
  });
