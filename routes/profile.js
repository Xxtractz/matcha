var express = require('express');
var router = express.Router();

/* GET Profile page. */
router.get('/', function(req, res, next) {
    res.render('profile', { page: 'Profile', menuId: 'profile' });
});

module.exports = router;