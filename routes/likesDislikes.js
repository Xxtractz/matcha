const router = require('express').Router();
const Users = require('../models/users');
const commonFunction = require('./commonFunctions');

router.post('/likes', async function(req, res){
    

      await Users.find({username: req.username}, (err, matches) => {
        if (err){
          console.log("When trying to find matches", err);
        }
  
        if (matches){
          matches.likes.push(req.idOfLiked);
          Users.findOneAndUpdate({username:req.username}, {likes:matches}, (err, document) =>{
            if(err){
                console.log("Something went wrong when trying to update", err)
                res.status(400).send({"Like":"Something went werong when trying to update"});
            }
            if(document)
            {
                res.status(200).send({"document":document});
            }
          });
        }
      });
    res.status(400).send({"Likes":"Something went wrong when trying to like"});
});

router.get('/likes', async function(req, res){
    

    await Users.findOne({username: req.username}, (err, matches) => {
        if(err)
        {
            console.log("There was an error getting your likes");
            res.status(400).send({"Likes":"There was an error getting your likes"});
        }
        if(matches)
        {
            res.status(200).send(matches.likes);
        }
        res.status(400).send({"Likes":"There are no likes"});
    });
});

router.post('/disLikes', async function(req, res){
    

    await Users.find({username: req.username}, (err, matches) => {
      if (err){
        console.log("When trying to find matches", err);
      }

      if (matches){
        matches.likes.push(req.idOfLiked);
        Users.findOneAndUpdate({username:req.username}, {likes:matches}, (err, document) =>{
          if(err){
              console.log("Something went wrong when trying to update", err)
              res.status(400).send({"Like":"Something went werong when trying to update"});
          }
          if(document)
          {
              res.status(200).send({"document":document});
          }
        });
      }
    });
  res.status(400).send({"Likes":"Something went wrong when trying to like"});
});