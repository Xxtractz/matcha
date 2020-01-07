const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();
var usersRoutes = require('./routes/user');


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

//adding routes 
app.use('/api', usersRoutes);//users information capturing routes

// DB Connection 
const db_link = require('./config/keys').MongoUrl;
mongoose.connect(`${db_link}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

//require the fastify framework and instantiate it
app.use(function (req, res, next) {
  //exclude other routes
  if (((req.method === 'POST' || req.method === 'OPTIONS') && req.url === '/api/login') ||((req.method === 'POST'|| req.method === 'OPTIONS') && req.url === '/api/register') || (req.method === 'POST' && req.url=== '/api/logout') || (req.method === 'POST' && req.url=== '/api/token/check') || (req.method === 'POST' && req.url === '/api/forgot') || (req.method === 'GET' && req.url === '/api/verification'))
  {
      next();
  }
  else {
      // Website you wish to allow to connect 
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, PATCH, DELETE, POST');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      //console.log(req.headers);
  
      // check header for the token
      let token = req.headers['authorization'];
      // decode token
      if (token !== 'undefined' && token)
      {
          let splittedToken = token.split(' ');
          let data;
          jwt.verify(splittedToken[1], process.env.SECRETS, (err, decoded) => {
              if (err)
              {
                  res.status(401).send("Token has expired");
              }
              data = decoded;
          });
          const id = data.user;
          Auth.findOne({username: id}, (err, doc) => {
              console.log(doc);
              console.log(data);
              if (err)
              {
                  console.log(err);
                  res.status(500).send("Something wrong when trying to find in database");
              } else if (doc && (doc.Token === splittedToken[1])) {
                  next();
              } else {
                  res.status(401).send('Invalid token or token was revoked');
              }
          });
      } else
      { 
          // if there is no token
          res.status(401).send({
      
              message: 'No token provided.'
          });
      }
  }
});
// Run server on Port 4000
app.listen(port, () => console.log(`Server started on Port ${port}`));

module.exports = app;