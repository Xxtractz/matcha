var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', {page:'Login', menuId:'login'});
});

/* GET Register. */
router.get('/register', function(req, res, next) {
  res.render('register', {page:'register', menuId:'register'});
});

/* GET forgot page. */
router.get('/forgot', function(req, res, next) {
  res.render('forgot', {page:'Reset', menuId:'forgot'});
});

module.exports = router;
