//dependency mongoose
const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
    username: {type: String},
    Token: {type: String, default: null},
    RefreshToken: {type: String, default: null}
}, {collection: "auth"});

module.exports = mongoose.model('Auth', Auth);