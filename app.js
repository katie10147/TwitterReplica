const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const history = require('connect-history-api-fallback');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const requestsRouter = require('./routes/requests');

const app = express();

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';



app.use(history());


// Set up user session
app.use(session({
    secret: 'fritter-secret',
    resave: true,
    saveUninitialized: true
  }));


  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/freets', freetsRouter);




// Catch all other routes into a meaningful error message
app.all('*', (req, res) => {
    const errorMessage = `
      Cannot find the resource <b>${req.url}</b>
      <br>
      Please use only supported routes below
      <br><br>
  
      <b>Home Page and URL Shortening</b>
      <br>
      GET / -- Go to home page
      <br>
      GET /:name -- Go to URL of short named :name
  
      <br><br>
  
      <b>Shorts</b>
      <br>
      GET /api/shorts -- Display all shorts stored on the server
      <br>
      POST /api/shorts -- Create and store a new short on the server
      <br>
      PUT /api/shorts/:name -- Update the short on the server with short name :name
      <br>
      DELETE /api/shorts/:name -- Delete the short on the server with short name :name
  
      <br><br>
  
      <b>Authentication</b>
      <br>
      POST /api/session -- Authenticate with username into the server
    `;
  
    res.status(404).send(errorMessage);
  });

module.exports = app;
