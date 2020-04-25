//dependency mongoose
const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    usernames: [],
    sender: {type: String, default: null},
    message: {type: String, default: null},
    date: {type: Date, default:Date.now}
}, {collection: "chats"});

module.exports = mongoose.model('Chats', Chat);