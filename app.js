const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const filterCors = require('./middlewares/cors');
const handleServerError = require('./middlewares/handleServerError');
const rateLimiter = require('./middlewares/rateLimiter');

// eslint-disable-next-line import/newline-after-import
require('dotenv').config();
const { PORT = 3000, MONGO_DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(rateLimiter);
app.use(requestLogger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(filterCors);

/* Все роуты */
app.use(router);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(handleServerError);

// eslint-disable-next-line eol-last
app.listen(PORT);