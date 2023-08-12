const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 300,
  message: 'Превышено количество запросов на сервер, повторите попытку через 10 минут.',
});

module.exports = rateLimiter;
