require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
// const mysqlConnect = require('./db');
const routes = require('./routes');
const pool = require('./db');

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes
routes(app, logger);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});


// GET all users
app.get('/getit/users', (req, res) => {
  pool.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) {
      logger.error("Error while getting users");
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific user by username
app.get('/getit/user', (req, res) => {
  var username = req.query.username;
  pool.query('SELECT * FROM users WHERE username = ?', username, function(err, rows, fields) {
    if (err) {
      logger.error('Error while getting user ' + username);
    }
    else{
      console.log(username);
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET users by type
app.get('/getit/usertype/', (req, res) => {
  var user_type = req.query.user_type;
  pool.query('SELECT * FROM users WHERE user_type = ?', user_type, function(err, rows, fields) {
    if (err) {
      logger.error('Error while getting user type ' + type);
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// POST a specific user
app.post('/postit/user', (req, res) => {
  var username = req.query.username;
  var password = req.query.password;
  var user_type = req.query.user_type;

  pool.query('INSERT INTO users (username, password, user_type) VALUES (?,?,?)', [username, password, user_type], function (err, rows, fields) {
    if (err) {
      logger.error("Error while inserting new user to users");
    }
    else{
      res.status(200).send(`added to the users table!`);
    }
  });
});