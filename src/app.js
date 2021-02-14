require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const internalRouter = require('./routes/internal');
const middleware = require('./middlewares');

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error('ERROR: ACCESS_TOKEN_SECRET not provided!');
  process.exit(1);
}

if (!(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD)) {
  console.error('ERROR: BASIC_AUTH_USER or BASIC_AUTH_PASSWORD not provided.');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/_internal', internalRouter);
app.use(middleware.error);

async function start() {
  await mongoose.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );

  app.listen(3000, () => null);
}

start();
