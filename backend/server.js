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


// -------------------------------------------------------------------
// --------------------------- API routes ----------------------------
// -------------------------------------------------------------------

// users table related 
// GET all users
app.get('/getit/users', (req, res) => {
  pool.query('SELECT * FROM users', function (err, result, fields) {
    if (err) {
      logger.error("Error while getting users");
    }
    else{
      res.end(JSON.stringify(result));
    }
  });
});

// GET a specific user by username
app.get('/getit/user', (req, res) => {
  var username = req.param('username');
  pool.query('SELECT * FROM users WHERE username = ?', username, function(err, result, fields) {
    if (err) {
      logger.error('Error while getting user ' + username);
    }
    else{
      res.end(JSON.stringify(result));
    }
  });
});

// GET users by type
app.get('/getit/usertype', (req, res) => {
  var user_type = req.param('user_type');
  pool.query('SELECT * FROM users WHERE user_type = ?', user_type, function(err, result, fields) {
    if (err) {
      logger.error('Error while getting user type ' + type);
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

// GET password by username
app.get('/getit/userpwd', (req, res) => {
  var username = req.param('username');
  pool.query('SELECT password FROM users WHERE username = ?', username, function(err, result, fields) {
    if (err) {
      logger.error('Error while getting password for user ' + username);
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

// UPDATE user password
app.put('/putit/userpwd', (req, res) => {
  var username = req.param('username');
  var newpwd = req.param('newpwd');
  pool.query('update users set password = ? where username = ?', [newpwd, username], function(err, result, fields) {
    if (err) {
      logger.error('Error while setting password for user ' + username);
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

// POST a specific user
app.post('/postit/user', (req, res) => {
  var username = req.param('username');
  var password = req.param('password');
  var user_type = req.param('user_type');

  pool.query('INSERT INTO users (username, password, user_type) VALUES (?,?,?)', [username, password, user_type], function (err, result, fields) {
    if (err) {
      logger.error("Error while inserting new user to users");
    }
    else{
      res.end(JSON.stringify(result));
    }
  });
});

// DELETE a user
app.delete('/deleteit/user', (req, res) => {
  var username = req.param('username');
  pool.query('delete from users where username = ? ', username, function (err, result, fields) {
    if (err) {
      logger.error("Error while deleting new user to users");
    }
    else{
      res.end(JSON.stringify(result));
    }
  });
});

// // npos table related
// app.post('/postit/npo', (req, res) => {
//   var username = req.param('username');
//   var title = req.param('title');
//   var location = req.param('location');
//   var logoURL = req.param('logoURL');
//   var image1URL = req.param('image1URL');
//   var image2URL = req.param('image2URL');
//   var image3URL = req.param('image3URL');
//   var image4URL = req.param('image4URL');
//   var image5URL = req.param('image5URL');
//   var description = req.param('description');

//   pool.query('insert into npos values ((select userID from users where username = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
//               [username, title, location, logoURL, image1URL, image2URL, image3URL, image4URL, image5URL, description], 
//               function (err, result, fields) {

//     if (err) {
//       logger.error("Error while inserting new user to users");
//     }
//     else{
//       res.end(JSON.stringify(result));
//     }
//   });
// });


///Peter
// GET all npos
app.get('/npos', (req,res) => {
  pool.query('select * from npos', function (err, result, fields) {
    if (err) {
      logger.error("Error while getting npos");
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});
// GET specific npo by npoID
app.get('/npos/:npoID', (req,res) => {
  var npoID = req.params.npoID;
  pool.query('select * from npos where npoID = ?', npoID, function (err,result,fields) {
    if (err) {
      logger.error("Error while getting npo by id " + npoID);
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});
// GET all images for specific npo by npoID
app.get('/npos/:npoID/images', (req,res) => {
  var npoID = req.params.npoID;
  pool.query('select * from images where npoID = ?', npoID, function (err,result,fields) {
    if (err) {
      logger.error("Error getting images for npo with id " + npoID);
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});
// POST new npo (use JSON body including: title, location, logoURL, description). the resulting npoID will be returned
app.post('/npos', async (req,res) => {
  var title = req.body.title;
  var location = req.body.location;
  var logoURL = req.body.logoURL;
  var description = req.body.description;
  var sql = "insert into npos (title, location, logoURL, description) values (?, ?, ?, ?)";
  pool.query(sql, [title, location, logoURL, description], function (err, result, fields) {
    if (err) {
      logger.error("Error posting new npo");
    }
    else {
      var npoID = result.insertId;
      res.end(JSON.stringify(npoID));
    }
  });
});
// POST image by npoID (use JSON body for imageURL). the resulting imageID will be returned
app.post('/npos/:npoID/images', async (req,res) => {
  var npoID = req.params.npoID;
  var imageURL = req.body.imageURL;
  pool.query('insert into images (imageURL, npoID) values (?,?)', [imageURL,npoID], function (err, result, fields) {
    if (err) {
      logger.error("Error posting image to npoID " + npoID + ", image url: " + imageURL);
    }
    else {
      var imageID = result.insertId;
      res.end(JSON.stringify(imageID));
    }
  });
});
// PUT link user to npo by userID and npoID
app.put('/users/:userID/:npoID', async (req,res) => {
  var userID = req.params.userID;
  var npoID = req.params.npoID;
  pool.query('update users set npoID = ? where userID = ?', [npoID,userID], function (err, result, fields) {
    if (err) {
      logger.error("Error linking user " + userID + " to npo " + npoID);
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});


///Prince 
//3.1 User viewing charity's ratings
app.get('/ratings/:npoID', (req,res) => {
  var npoID = req.param('npoID')
  pool.query('select * from ratings WHERE npoID =', npoID, function (err, result, fields) {
    if (err) {
      logger.error("Error while getting ratings");
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

//3.2 User viewing charity's description
app.get('/description/:npoID', (req,res) => {
  var npoID = req.param('npoID')
  pool.query('select * from description WHERE npoID = ?',npoID, function (err, result, fields) {
    if (err){
      logger.error("Error while getting ratings");
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});


//3.3 User vieweing charity's information
app.get('/information/:npoID', (req, res) => {
  var npoID = req.param('npoID')
  pool.query('select * from information WHERE npoID = ?', npoID, function (err, result, fields) {
    if (err){
      logger.error("Error while getting charity information")
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});


// 8.1  View flagged ratings as an Admin
app.get('/ratings/:status', (req, res) => {
  var status = req.param('status')
  pool.query('select * from ratings WHERE flagged = ?', status, function(err, result, fields) {
    if (err){
      logger.error("Error while getting flagged reviews")
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

// 8.2 Unflag ratings as an Admin
app.put('/ratings/:rating', async(req, res) => {

  var oldRating = req.param('oldRating');
  var newRating = req.param('newRating');

  pool.query('UPDATE ratings SET rating = ? WHERE rating = ?', [newRating, oldRating], function (err, result, fields){
    if (err){
      logger.error("Failed updating ratings")
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

//8.3 delete reviews as an Admin
app.delete('/reviews/:userID', async(req, res) => {

  var userID = req.param('userID');

  pool.query('DELETE FROM reviews WHERE userID = ?', userID, function(err, result, fields){
    if (err) {
      logger.error("Failed to delete review")
    }
    else {
      res.end(JSON.stringify(result));
    }
  });
});

//10.1 flag reviews or ratings as an NPO
app.post('/ratings', async(req, res) =>{

  var review = req.param('review')
  var rating = req.param('rating')

  pool.query('INSERT INTO ratings (review, rating) VALUES (?,?)', [review, rating], function(err, result, fields){
    if(err){
      logger.error("Failed to flag ratings")
    }
    else{
      res.end(JSON.stringify(result));
    }
  });
});

