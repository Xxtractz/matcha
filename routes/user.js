const jwt = require('jsonwebtoken');
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const tokenGen = require('uuid-token-generator');
const dotenv = require('dotenv').config();
const Users = require('../models/users');
const boom = require('boom');
const commonFunction = require('./commonFunctions');

router.use(cors());

//sign up post
router.post('/register', function(req, res){
  
    if (req.body.fname && req.body.lname && req.body.username && req.body.email && req.body.password && req.body.age){
      Users.findOne({'username': req.body.username}, function(err, user){
        if (err)
        {
          console.log(err);
        }else{
          if (!user){
            Users.findOne({'email': req.body.email}, function(err, user1){
              if(err){
                console.log(err);
                res.status(500).send({"User": "Could not connect to the database"});
              }else {
                console.log(user1);
                if (!user1){
                  const tokgen = new tokenGen(256, tokenGen.BASE62);
                  let tkn = tokgen.generate();
                  let user = {
                  firstname: req.body.fname,
                  lastname: req.body.lname,
                  age: req.body.age,
                  username: req.body.username,
                  email: req.body.email,
                  token: tkn,
                  status: '0',
                  password: req.body.password
                };
                  Users.create(user, function(err, doc){
                      if(err){
                          console.log(err);
                      }else{
                          commonFunction.sendEmail(req.body.email, "Verify your account",
                          '<a href="http://localhost:4000/verify?token='+ tkn + '">Click Here</a>');
                         res.status(200).send(doc);
                      }
                  });
                }else {
                  res.status(400).send({"User": "Email already exists"});
                }
              }
              });
              }else {
                res.status(400).send({"User": "Username already exists"});
                }
            }
            });
    }else {
      res.status(400).send({"User": "Please make sure that all the required field are filled"});
    }
});

//user logging in
router.post('/api/login', async (req, res) => {
  try {
      CommonFunctions.logout(req.body.username);
      await Users.findOne({$or:[{username: req.body.username}, {email: req.body.email}]}, (err, user) => {
          if (err)
          {
              console.log(err);
              res.status(500).send({"User": "Internal error can not get the user"});
          } else if (!user) {
              res.status(204).send({"User": "No matches found"});
          } else {
            if(user.active == 0) {
              res.status(400).send({"User":"The user was never verified"})
            } else {
              if (req.body.Password === user.Password)
              {
                      loggedUser = {
                          _id: user._id,
                          username: req.body.username,
                          fame: user.firstName,
                          lname: user.lastName,
                          email: user.email,
                          age: user.age,
                          gender: user.gender,
                          genderPreference: user.genderPreference,
                          LP: user.LP,
                          NO: user.NO,
                          LW: user.LW,
                          SE: user.SE,
                          MV: user.MV,
                          RD: user.RD,
                          bio: user.Bio,
                          active:user.active,
                          date: user.date
                      }
                      const token = jwt.sign(loggedUser, process.env.SECRETS, { expiresIn: process.env.TOKENLIFE})
                      const refreshToken = jwt.sign(loggedUser, process.env.REFRESHTOKENSECRETS, { expiresIn: process.env.REFRESHTOKENLIFE})
                      const response = {
                          "username": req.body.username,
                          "Token": token,
                          "RefreshToken": refreshToken,
                      }
                      const auth = new Auth(response);
                      auth.save();
                      const resp = {
                          "Token": token,
                          "RefreshToken": refreshToken
                      }
                      res.status(200).send(resp);
              } else {
                  res.status(400).send({"User": "Bad credentials"})
              }
          }
        }
      });
  } catch (err) {
      throw boom.boomify(err);
  }
});


module.exports = router;