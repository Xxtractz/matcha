const { User, validate } = require('../../models/user.model');
const Joi = require('joi');
const _ = require("lodash");
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('login', { page: 'Login', menuId: 'login' });
});

/* POST Login credentials*/

router.post('/login', async(req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    res.send(true);
});

module.exports = router;