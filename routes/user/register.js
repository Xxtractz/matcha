const { User, validate } = require('../../models/user.model');
const _ = require("lodash");
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

/* GET Register. page */
router.get('/register', function(req, res, next) {
    res.render('user/register', { page: 'Register', menuId: 'register' });
});

/* POST Register credetials*/
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
        user = new User(_.pick(req.body, ['name', 'lastname', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    }
});

module.exports = router;