require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT = 3001, bd = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(bd)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Подключение к базе состоялось');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Приложение работает на порте ${PORT}`);
    });
  })

  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Ошибка подключения к базе', err);

    process.exit();
  });
