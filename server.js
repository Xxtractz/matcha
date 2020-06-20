const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const boom = require("@hapi/boom");
const Chat = require("./models/chats");
const port = process.env.PORT || 4000;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const userRoutes = require('./routes/user.routes');

http.listen(4001);

// // routing
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
//   });

//   // usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = [];

io.sockets.on("connection", function(socket) {
    // when the client emits 'adduser', this listens and executes
    socket.on("adduser", function(username) {
        // store the username in the socket session for this client
        rooms.push(username);
        socket.username = username;
        // store the room name in the socket session for this client
        socket.room = username;
        // add the client's username to the global list
        usernames[username] = username;
        // send client to room 1
        socket.join(username);
        // echo to client they've connected
        socket.emit("updatechat", "SERVER", `you have connected to ${username}`);
        // echo to room 1 that a person has connected to their room
        socket.broadcast
            .to(username)
            .emit("updatechat", "SERVER", username + " has connected to this room");
        socket.emit("updaterooms", rooms, username);
    });

    // when the client emits 'sendchat', this listens and executes
    socket.on("sendchat", function(data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        console.log(data);

        Chat.create(data, (err) => {
            if (err) {
                boom.boomify(err);
            }
        });

        io.sockets.in(socket.room).emit("updatechat", socket.username, data);
    });

    socket.on("switchRoom", function(newroom) {
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit("updatechat", "SERVER", "you have connected to " + newroom);
        // sent message to OLD room
        socket.broadcast
            .to(socket.room)
            .emit("updatechat", "SERVER", socket.username + " has left this room");
        // update socket session room title
        socket.room = newroom;
        socket.broadcast
            .to(newroom)
            .emit("updatechat", "SERVER", socket.username + " has joined this room");
        socket.emit("updaterooms", rooms, newroom);
    });

    // when the user disconnects.. perform this
    socket.on("disconnect", function() {
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit("updateusers", usernames);
        // echo globally that this client has left
        socket.broadcast.emit(
            "updatechat",
            "SERVER",
            socket.username + " has disconnected"
        );
        socket.leave(socket.room);
    });
});

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));

//adding routes
app.use('/', userRoutes); 


//require the fastify framework and instantiate it
app.use(function(req, res, next) {
    //exclude other routes
    // console.log(req);
    if (

        (req.method === "POST" && req.url === "/logout") ||
        (req.method === "POST" && req.url === "/users/register") ||
        (req.method === "POST" && req.url === "/verifyAgain") ||
        (req.method === "GET" && req.url === "/socket.io/socket.io.js")
    ) {
        console.log(req.url);
        next();
    } else {
        console.log(req.url);
        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Request methods you wish to allow
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS, PUT, PATCH, DELETE, POST"
        );

        // Request headers you wish to allow
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type, authorization"
        );

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader("Access-Control-Allow-Credentials", true);

        //console.log(req.headers);

        // check header for the token
        let token = req.headers["authorization"];
        // decode token
        if (token !== "undefined" && token) {
            let splittedToken = token.split(" ");
            jwt.verify(splittedToken[1], process.env.SECRETS, (err) => {
                if (err) {
                    console.log(err);
                    res.status(401).send("Token has expired");
                }
                next();
            });
        } else {
            // if there is no token
            res.status(401).send({
                message: "No token provided.",
            });
        }
    }
});

// Run server on Port 4000
app.listen(port, () => console.log(`Server started on Port ${port}`));

module.exports = app;