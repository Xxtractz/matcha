//dependency mongoose
const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    username_sender: {type: String},
    username_receiver: {type: String},
    Token: {type: String, default: null},
    RefreshToken: {type: String, default: null}
}, {collection: "chats"});

module.exports = mongoose.model('Chats', Chat);