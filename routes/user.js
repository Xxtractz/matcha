const jwt = require('jsonwebtoken');
const _ = require("lodash");
//const bcrypt = require('bcryptjs');
const cors = require('cors');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const tokenGen = require('uuid-token-generator');
const dotenv = require('dotenv').config();
const Users = require('../models/users');
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
                          '<a href="http://localhost:3000/verify?token='+ tkn + '">Click Here</a>');
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

router.post('/api/login', async(req, res) => {
    // First Validate The HTTP Request
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect password.');
    }
    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.send(token);
});


module.exports = router;