var express = require('express');
var router = express.Router();

/* GET forgot page. */
router.get('/forgot', function(req, res, next) {
    res.render('forgot', { page: 'Reset', menuId: 'forgot' });
});

module.exports = router;