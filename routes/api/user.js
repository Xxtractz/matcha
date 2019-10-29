const { User, validate } = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

/* POST Register credetials*/
router.post('/api/register', async(req, res) => {
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
        user = new User(_.pick(req.body, ['name', 'lastname', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, 'PrivateKey');
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'lastname', 'email']));
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