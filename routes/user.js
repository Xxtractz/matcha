const _ = require("lodash");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const tokenGen = require('uuid-token-generator');
const dotenv = require('dotenv').config();
const Users = require('../models/users');
const boom = require('boom');
const Auth = require('../models/auth');
const Verification = require('../models/verification');
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
                  dob: req.body.dob,
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
                          '<p> Please <a href="http://localhost:4000/verify?token='+tkn +'"> Click Here </a> to verify.</p>');
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
router.post('/login', async (req, res) => {
  try {
      commonFunction.logout(req.body.username);
      await Users.findOne({$or:[{username: req.body.username}, {email: req.body.username}]}, (err, user) => {
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
              bcrypt.compare(req.body.password, user.password, function(err, response) {
                if(response) {
                  loggedUser = {
                    _id: user._id,
                    username: req.body.username,
                    fname: user.firstname,
                    lname: user.lastname,
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
                // const token = jwt.sign(loggedUser, process.env.SECRETS, { expiresIn: process.env.TOKENLIFE})
                const token = jwt.sign(loggedUser, process.env.SECRETS)
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
              });
          }
        }
      });
  } catch (err) {
      throw boom.boomify(err);
  }
});

//check if token exists
router.post('/token/check', async (req, res) => {
  await Auth.findOne({username: req.body.username}, (err, doc) => {
      if (err){
          res.status(500).send({"User":"Encountered a problem while checking in collection"});
      } else if (doc) {
          if (doc.token === req.body.token)
          {
              res.status(200).send({"User":"Token is valid and belongs to the user"});
          } else {
              res.status(400).send({"User":"Invalid token"});
          }
      } else {
          res.status(204).send({"User":"The token is not set for the user"});
      }
  });
});

//verify the user that has just registered
router.post('/userVerify', async (req, res) => {
  await Verification.findOne({username: req.body.username}, (err, doc) => {
      if (err){
          res.status(500).send({"User":"Encountered a problem while checking in collection"});
      } else if (doc) {
          if (doc.token === req.body.token)
          {
            Verification.findOneAndDelete({username: req.body.username}, (err, doc) => {
              if (err)
              {
                res.status(400).send({"User": "The token could not be deleted"});
              }
            });
              res.status(200).send({"User":"Token is valid and belongs to the user"});
          } else {
              res.status(400).send({"User":"Invalid token"});
          }
      } else {
          res.status(204).send({"User":"The token is not set for the user"});
      }
  });
});

//when the user clicks on the forgot password they post the email to this api
router.post('/forgot', async (req, res) => {
  try {
     await Users.findOne({email:req.body.email}, (err, doc) => {
          if (err)
          {
              console.log(err);
              res.send({"User":"Internal server error can not update the user."});
          } else if (!doc) {
              res.status(400).send({"User":"The email you entered does not exist."});
          } else {
              let verification = {
                  username: doc.username,
                  email: doc.email
              };
              const token = jwt.sign(verification, process.env.SECRETS);
              verification.token = token;
              const ver = new Verification(verification);
              ver.save();

              let html = "<h1>Reset Password</h1> <br> <p>To reset your password please click <b><a href='http://localhost:3001/verification/"+token+"'>here</a></b>.</p>";
              let result = CommonFunctions.sendEmail(html, req.body.email, "Reset Password");
              if(result === 1)
              {
                  res.status(200).send({"User":"Check your email for instructions to reset password"});
              } else {
                  res.status(400).send("Failed to send the email");
              } 
          }
      }); 
  } catch (err) {
      throw boom.boomify(err);
  }
});

//changing the password of the user
router.post('/change/password', async (req, res) => {
  try {
      await Users.findByIdAndUpdate({username:req.body.username}, {password: req.body.password}, (err, doc) => {
          if (err)
          {
              console.log(err);
              res.status(500).send({"User":"Something wrong happened"});
          } else if (doc)
          {
              res.status(200).send(doc);
          } else {
              res.status(400).send({"User":"The user does not exist"});
          }
      });
  } catch (err) {
      boom.boomify(err);
  }
});

module.exports = router;