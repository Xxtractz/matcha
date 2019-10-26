const { User } = require('../../models/user.model');
const Joi = require('joi');
const _ = require("lodash");
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('user/login', { page: 'Login', menuId: 'login' });
});

/* POST Login credentials*/

router.post('/api/login', async(req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

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
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;