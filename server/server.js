//Express boilerplate
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
require('dotenv').config();
// console.log(process.env);

const goalRouter = require('./routers/goalRouter');
const authRouter = require('./routers/authRouter');

const GITHUB_URL = 'https://github.com/login/oauth/access_token';

const sessions = new Map();

//Serve the static files from the React app
app.use('/build', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));

app.use('/api/auth', authRouter);
app.use('/api', goalRouter);

//Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// general error handler.
app.use((err, req, res, next) => {
  const defErr = {
    log: 'Express caught unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred' }
  };
});

app.listen(port, () => console.log(`Listening on port ${port}`));
