
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var usersRoutes = require('./routes/user');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// DB Connection 
const db_link = require('./config/keys').MongoUrl;
mongoose.connect(`${db_link}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use('/',usersRoutes);

// Run server on Port 4000
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on Port ${port}`));