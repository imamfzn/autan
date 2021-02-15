const morgan = require('morgan');

const format = JSON.stringify({
  remote_addr: ':remote-addr',
  remote_user: ':remote-user',
  date: ':date[iso]',
  method: ':method',
  url: ':url',
  http_version: ':http-version',
  status: ':status',
  referrer: ':referrer',
  user_agent: ':user-agent',
  response_time: ':response-time',
});

module.exports = morgan(format);
