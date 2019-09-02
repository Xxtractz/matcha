const express = require('express');
const router = express.Router();
const AuthUtils = require('../utils/auth');
const passport = require('passport');

router.get('/login',(req, res, next)    =>  {
    const message = req.flash();
    res.render('login', { message });
});
