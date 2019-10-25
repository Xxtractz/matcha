require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //get the token from the header if present
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];



    //if no token found, return response (without going to the next middelware)
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_JWT, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    //     req.user = decoded;

    // } catch (ex) {
    //     //if invalid token
    //     localStorage.clear();
    //     sessionStorage.clear();
    //     res.render('user/login');
    // }
};