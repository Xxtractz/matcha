var express = require('express');
var router = express.Router();
const auth = require("../services/authguard")

/* GET home page. */
router.get('/', auth, function(req, res, next) {
    res.render('dashboard', { page: 'Dashboard', menuId: 'dashboard' });
});

module.exports = router;