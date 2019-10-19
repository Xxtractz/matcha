const { User, validate } = require('../models/user.model');
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
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            lastname: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});


/* GET forgot page. */
router.get('/forgot', function(req, res, next) {
    res.render('forgot', { page: 'Reset', menuId: 'forgot' });
});

module.exports = router;