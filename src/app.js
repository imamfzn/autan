require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./lib/logger');
const authRouter = require('./routes/auth');
const internalRouter = require('./routes/internal');
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

app.use(express.json());
app.use(requestLog);
app.use('/auth', authRouter);
app.use('/_internal', internalRouter);
app.use(errorHandler);

async function start() {
  await mongoose.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );

  app.listen(3000, () => logger.info(`Autan is running on port ${port}`));
}

start();
