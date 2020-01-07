const createError = require('http-errors');
const express = require('express');
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


// DB Connection 
const db_link = require('./config/keys').MongoUrl;
//"mongodb+srv://xxtractz:Password1@matcha-ifa9u.mongodb.net/matcha?retryWrites=true&w=majority"
mongoose.connect(`${db_link}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use('/api', usersRoutes);

app.get('/',(req,res) => {
    res.send("hello world");
})

// Run server on Port 4000
app.listen(port, () => console.log(`Server started on Port ${port}`));

module.exports = app;