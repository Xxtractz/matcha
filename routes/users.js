const { User, validate } = require('../models/user.model');
const _ = require("lodash");
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
    res.render('login', { page: 'Login', menuId: 'login' });
});

/* GET Register. */
router.get('/register', function(req, res, next) {
    res.render('register', { page: 'Register', menuId: 'register' });
});

/* POST Register */
router.post('/register', async(req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('Oops!!! Email already Exist, please try the forgot password');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        user = new User(_.pick(req.body, ['name', 'lastname', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(_.pick(user, ['_id', 'name', 'lastname', 'email']));
    }
});


/* GET forgot page. */
router.get('/forgot', function(req, res, next) {
    res.render('forgot', { page: 'Reset', menuId: 'forgot' });
});

module.exports = router;