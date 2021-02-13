const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const internalRouter = require('./routes/internal');

const app = express();

if (!process.env.ACCESS_TOKEN_SECRET){
  console.error("ERROR: ACCESS_TOKEN_SECRET not provided!");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/autan", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb."))
  .catch(err => console.error(`Can't connect to mongodb. Error:\n${err}`));

app.use(express.json());
app.use('/auth', authRouter);
app.use('/_internal', internalRouter);


app.listen(3000, () => console.log("App is running"));
