require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./lib/logger');
const { errorHandler, requestLog } = require('./middlewares');

if (!process.env.ACCESS_TOKEN_SECRET) {
  logger.fatal('ACCESS_TOKEN_SECRET not provided.');
  process.exit(1);
}

if (!(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD)) {
  logger.fatal('BASIC_AUTH_USER or BASIC_AUTH_PASSWORD not provided.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLog);
app.use(routes);
app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    );
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  app.listen(port, () => logger.info(`Autan is running on port ${port}`));
}

start();
