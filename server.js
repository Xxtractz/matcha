const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const boom = require('boom');
const Users = require('./models/users');
var bcrypt = require('bcrypt-nodejs');
const commonFunction = require('./routes/commonFunctions');
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

app.get('/verify/:id', async (req, res) => {
    try {
        const data = jwt.verify(req.params.id, process.env.SECRETS);
        const username = data.username;
        await Users.findOneAndUpdate({username: username}, {status: "1"}, (err, doc) => {
            if (err)
            {
                console.log(err);
                res.status(500).send("Internal server error");
            } else if (doc){
            
                res.status(200).send({"Verify":"Successfully verified the user."});
            }
            else {
                res.status(400).send({"Verify":"Try resending the verification link again"});
            }
        });
        
    } catch (error) {
        res.status(400).send({"Verify": "Invalid token."})
    }
   
});

app.post('/verifyAgain', async (req, res) => {
    await Users.findOne({'email': req.body.email}, function(err, user1){
        if(err){
            console.log(err);
            res.status(500).send({"User": "Could not connect to the database"});
        } else if (user1) {
            console.log(user1);
            let user = {
            firstname: user1.firstname,
            lastname: user1.lastname,
            dob: user1.dob,
            age: user1.age,
            username: user1.username,
            email: user1.email,
            };
            const token = jwt.sign(user, process.env.SECRETS);
            user.token = token; 
            commonFunction.sendEmail(req.body.email, "Verify your account",
            '<p> Please <a href="http://localhost:3001/verify?token='+token +'"> Click Here </a> to verify.</p>');
            res.status(200).send({"Verify":"Successfully verified the user."});
        } else {
            res.status(400).send({"Verify":"The username or email does not exists"});
        }
    });
});

app.post('/verification', async (req, res) => {
    const username = req.body.username;

    let hashPass;
    let special = "@#%!";
    let password = Math.random().toString(36).substring(5);
    password += special.charAt(Math.floor(Math.random() * special.length));
    password += Math.random().toString(36).substring(3).toUpperCase();


    bcrypt.genSalt(process.env.SALT_FACTOR, (err, salt) => {
        if (err) {
            boom.boomify(err);
        }

        bcrypt.hash(password, salt, null, (err, hash) => {
            if (err)
            {
                boom.boomify(err);
            }
               hashPass = hash;
        });
    });

    await Users.findOneAndUpdate({username: username},{$set:{Password: hashPass}},{new: true}, (err, doc) => {
        if (err)
        {
            boom.boomify(err);
            res.status(500).send("Internal server error");
        } else if (doc){
            let html = `<h1>Password was reset</h1> <br> <p>These are your login details: <br><b> Username: ${doc.username}</b><br><b>Password: ${password}</b><br> </p>`;
            commonFunction.sendEmail(html, doc.Email, "Successfully Reset Password");
            res.status(200).send({"Verify":"Successfully reset the password"});
        }
        else {
            res.status(400).send({"Verify": "The user does not exists"});
        }
    });
});

//require the fastify framework and instantiate it
app.use(function (req, res, next) {
  //exclude other routes
  if (((req.method === 'POST' || req.method === 'OPTIONS') && req.url === '/api/login') ||((req.method === 'POST'|| req.method === 'OPTIONS') && req.url === '/api/register') || (req.method === 'POST' && req.url=== '/api/logout') || (req.method === 'POST' && req.url=== '/api/token/check') || (req.method === 'POST' && req.url === '/api/forgot') || (req.method === 'GET' && req.url === '/verify/:id'))
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