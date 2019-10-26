var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
var mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');


// Routers declare
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/user/login');
var registerRouter = require('./routes/user/register');
var forgotRouter = require('./routes/user/forgot');
var profileRouter = require('./routes/profile');
var chatRouter = require('./routes/chat');
var dashboardRouter = require('./routes/dashboard');

var app = express();

// Passport Config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers 
app.use('/', indexRouter);
app.use('/user', loginRouter);
app.use('/user', registerRouter);
app.use('/user', forgotRouter);
app.use('/profile', profileRouter);
app.use('/chat', chatRouter);
app.use('/dashboard', dashboardRouter);

// DB Connection 
const db_link = require('./config/keys').MongoUrl;
mongoose.connect(`${db_link}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;