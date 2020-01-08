//dependency mongoose
const mongoose = require('mongoose');

const Verification = new mongoose.Schema({
    username: {type: String},
    token: {type: String},
    email: {type: String},
}, {collection: "verification"});

module.exports = mongoose.model('Verification', Verification);