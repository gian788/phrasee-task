const morgan = require('morgan');
const {createLogger, format, transports} = require('winston');
const Console = transports.Console;
const colours = require('./colours');

// Add a morgan token to get the host from the request for the access log.
morgan.token('host', req => req.headers.host);

const accessFormat = [
  ['request_referrer', ':referrer'],
  ['request_host', ':host'],
  ['request_query', ':url'],
  ['request_agent', ':user-agent'],
  ['response_code', ':status'],
  ['response_time', ':response-time'],
  ['request_ip', ':remote-addr'],
  ['request_method', ':method'],
  ['timestamp', ':date[iso]'],
];

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 5,
};

const appLogger = createLogger({ levels });
const accessLogger = createLogger({ levels });

const colourString = (str, colour) => `${colour.open}${str}${colour.close}`;

const getResponse = (code) => {
  switch (code) {
    case 200:
      return colourString(code, colours.info);
    case 500:
      return colourString(code, colours.fatal);
    default:
      return code;
  }
};

const accessFormatter = format.printf((info) => {
  const { message, disabledColors } = info;
  // TODO add content length
  return [message.timestamp,
    message.request_method,
    disabledColors ? message.response_code : getResponse(message.response_code),
    message.request_query,
    `${message.response_time} ms`].join(' ');
});

const appFormatter = format.printf((info) => {
  const {
    level,
    message,
    meta,
    timestamp,
  } = info;

  let str = `${colourString(timestamp, colours.grey)} `;
  str += `${colourString(level.toUpperCase(), colours[level])} `;
  str += `${message}`;
  if (meta) {
    if (meta.message) {
      str += ` ${meta.message}`;
    }
    if (meta.stack) {
      str += `\n${meta.stack}`;
    }
  }
  return str;
});

appLogger.add(new Console({
  eol: '',
  format: format.combine(
    format.splat(),
    format.timestamp(),
    appFormatter,
  ),
}));

accessLogger.add(new Console({
  eol: '',
  format: format.combine(
    format.splat(),
    format.timestamp(),
    accessFormatter,
  ),
}));

module.exports = {
  expressMiddleware: () => morgan(accessFormat.map(el => el[1]).join('\t'), {
    stream: {
      write: (message) => {
        const messageArray = message.trim().split('\t');
        const messageObj = {};
        accessFormat.forEach((el, index) => {
          messageObj[el[0]] = messageArray[index];
        });
        messageObj.response_code = parseInt(messageObj.response_code, 10);
        messageObj.response_time = parseFloat(messageObj.response_time, 10);
        accessLogger.info(messageObj);
      },
    },
  }),
  debug: (...args) => appLogger.debug(...args),
  info: (...args) => appLogger.info(...args),
  warn: (...args) => appLogger.warn(...args),
  error: (...args) => appLogger.error(...args),
  fatal: (...args) => appLogger.fatal(...args),
};
