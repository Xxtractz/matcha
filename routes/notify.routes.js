const app = require('express').Router();
const notifications = require("../controllers/notify.controller");

    //saving a chat
    app.post("/notify/save", notifications.create);

    //getting chats for two users
    app.post("/notify/get", notifications.getNotifications);

    module.exports= app;