var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require("mongoose");
var port = process.env.PORT || 4000;
var app = express();


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


// DB Connection 
const db_link = require('./config/keys').MongoUrl;
//"mongodb+srv://xxtractz:Password1@matcha-ifa9u.mongodb.net/matcha?retryWrites=true&w=majority"
mongoose.connect(`${db_link}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// Run server on Port 4000
app.listen(port, () => console.log(`Server started on Port ${port}`));

module.exports = app;