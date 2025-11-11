const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console()
    // add file transports or remote transports in prod
  ]
});
module.exports = logger;
