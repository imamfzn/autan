require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const internalRouter = require('./routes/internal');

if (!process.env.ACCESS_TOKEN_SECRET){
  console.error("ERROR: ACCESS_TOKEN_SECRET not provided!");
  process.exit(1);
}

if (! (process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD)){
  console.error("ERROR: BASIC_AUTH_USER or BASIC_AUTH_PASSWORD not provided.");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/_internal', internalRouter);

(
  async function (){
    try {
      await mongoose.connect(
        'mongodb://localhost/autan',{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        }
      );
    } catch (e) {
      throw e;
    }

    app.listen(3000, () => console.log("autan is running on port 3000"));

  }
)();
