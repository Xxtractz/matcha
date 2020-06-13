const _ = require("lodash");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const tokenGen = require("uuid-token-generator");
const dotenv = require("dotenv").config();
const Users = require("../models/users");
const boom = require("@hapi/boom");
const Auth = require("../models/auth");
const commonFunction = require("../controllers/commonFunctions");

router.use(cors());

//register the user
router.post("/register", function(req, res) {
    if (
        req.body.fname &&
        req.body.lname &&
        req.body.username &&
        req.body.email &&
        req.body.password &&
        req.body.age
    ) {
        Users.findOne({ username: req.body.username }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (!user) {
                    Users.findOne({ email: req.body.email }, function(err, user1) {
                        if (err) {
                            console.log(err);
                            res
                                .status(500)
                                .send({ User: "Could not connect to the database" });
                        } else {
                            console.log(user1);
                            if (!user1) {
                                let user = {
                                    firstname: req.body.fname,
                                    lastname: req.body.lname,
                                    dob: req.body.dob,
                                    age: req.body.age,
                                    username: req.body.username,
                                    password: req.body.password,
                                    email: req.body.email,
                                    status: "0",
                                };
                                const token = jwt.sign(user, process.env.SECRETS);
                                user.token = token;
                                Users.create(user, function(err, doc) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        commonFunction.sendEmail(
                                            req.body.email,
                                            "Verify your account",
                                            '<p> Please <a href="http://localhost:3000/verify?token=' +
                                            token +
                                            '"> Click Here </a> to verify.</p>'
                                        );
                                        res.status(200).send(doc);
                                    }
                                });
                            } else {
                                res.status(400).send({ User: "Email already exists" });
                            }
                        }
                    });
                } else {
                    res.status(400).send({ User: "Username already exists" });
                }
            }
        });
    } else {
        res.status(400).send({
            User: "Please make sure that all the required field are filled",
        });
    }
});


//user logging in
router.post("/login", async(req, res) => {
    try {
        commonFunction.logout(req.body.username);
        await Users.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] },
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ User: "Internal error can not get the user" });
                } else if (!user) {
                    res.status(204).send({ User: "No matches found" });
                } else {
                    if (user.status === "0") {
                        res
                            .status(400)
                            .send({ User: "The user was never verified", Token: user.token });
                    } else {
                        bcrypt.compare(req.body.password, user.password, function(
                            err,
                            response
                        ) {
                            if (response) {
                                loggedUser = {
                                    _id: user._id,
                                    username: user.username,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email,
                                    gender: user.gender,
                                    genderPreference: user.genderPreference,
                                    bio: user.bio,
                                    status: user.status,
                                    profileImage: user.profileImage,
                                    images: user.images,
                                    active: user.active,
                                    date: user.date,
                                    age: user.age,
                                    dob: user.dob,
                                    interests: user.interests,
                                    likes: user.likes,
                                    dislikes: user.dislikes,
                                    lastseen: "1"
                                };
                                const token = jwt.sign(loggedUser, process.env.SECRETS);
                                const refreshToken = jwt.sign(
                                    loggedUser,
                                    process.env.REFRESHTOKENSECRETS, { expiresIn: process.env.REFRESHTOKENLIFE }
                                );
                                const response = {
                                    username: req.body.username,
                                    Token: token,
                                    RefreshToken: refreshToken,
                                };
                                const auth = new Auth(response);
                                auth.save();
                                const resp = {
                                    Token: token,
                                    RefreshToken: refreshToken,
                                };
                                res.status(200).send(resp);
                            } else {
                                res.status(400).send({ User: "Bad credentials" });
                            }
                        });
                    }
                }
            }
        );
    } catch (err) {
        throw boom.boomify(err);
    }
});

//get a user back
router.get("/user/:id", async(req, res) => {
    try {
        const id = req.params.id;
        await Users.findById(id, (err, user) => {
            if (err) {
                console.log(err);
                res.send({ User: "Internal server error can not update the user" });
            } else {
                userOne = {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    gender: user.gender,
                    genderPreference: user.genderPreference,
                    bio: user.bio,
                    status: user.status,
                    profileImage: user.profileImage,
                    images: user.images,
                    active: user.active,
                    date: user.date,
                    age: user.age,
                    dob: user.dob,
                    interests: user.interests,
                    likes: user.likes,
                    dislikes: user.dislikes,
                    lastseen: user.lastseen
                };
                res.status(200).send({ User: userOne });
            }
        });
    } catch (error) {
        throw boom.boomify(error);
    }
});

//update an existing user information
router.put("/update/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const {...updateData } = user;

        await Users.findByIdAndUpdate(
            id,
            updateData, { new: true },
            (err, update) => {
                if (err) {
                    console.log(err);
                    res.send({ User: "Internal server error can not update the user" });
                } else if (!update) {
                    res.status(400).send({ User: "Unable to update check your id" });
                } else {
                    res
                        .status(200)
                        .send({ User: update, Message: "Successfully Updated" });
                }
            }
        );
    } catch (err) {
        throw boom.boomify(err);
    }
});

//changing the password of the user
router.post("/change/password", async(req, res) => {
    try {
        let password = req.body.password;
        let hashPass = null;

        bcrypt.genSalt(process.env.SALT_FACTOR, (err, salt) => {
            if (err) {
                boom.boomify(err);
            }

            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) {
                    boom.boomify(err);
                }
                hashPass = hash;
            });
        });
        await Users.findByIdAndUpdate({ username: req.body.username }, { password: hashPass },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ User: "Something wrong happened" });
                } else if (doc) {
                    res.status(200).send({ User: "User Password Succesfully updated" });
                } else {
                    res.status(400).send({ User: "The user does not exist" });
                }
            }
        );
    } catch (err) {
        boom.boomify(err);
    }
});

//check if token exists
router.post("/token/check", async(req, res) => {
    await Auth.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            res
                .status(500)
                .send({ User: "Encountered a problem while checking in collection" });
        } else if (doc) {
            if (doc.token === req.body.token) {
                res
                    .status(200)
                    .send({ User: "Token is valid and belongs to the user" });
            } else {
                res.status(400).send({ User: "Invalid token" });
            }
        } else {
            res.status(204).send({ User: "The token is not set for the user" });
        }
    });
});

//verify the user after registration
router.get("/verify/:id", async(req, res) => {
    try {
        const data = jwt.verify(req.params.id, process.env.SECRETS);
        const username = data.username;
        await Users.findOneAndUpdate({ username: username }, { status: "1" },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal server error");
                } else if (doc) {
                    res.status(200).send({ Verify: "Successfully verified the user." });
                } else {
                    res
                        .status(400)
                        .send({ Verify: "Try resending the verification link again" });
                }
            }
        );
    } catch (error) {
        res.status(400).send({ Verify: "Invalid token." });
    }
});

//verification for invalid token and getting new token
router.post("/verifyAgain", async(req, res) => {
    await Users.findOne({ email: req.body.email }, function(err, user1) {
        if (err) {
            console.log(err);
            res.status(500).send({ User: "Could not connect to the database" });
        } else if (user1) {
            console.log(user1);
            let user = {
                firstname: user1.firstname,
                lastname: user1.lastname,
                dob: user1.dob,
                age: user1.age,
                username: user1.username,
                email: user1.email,
            };
            const token = jwt.sign(user, process.env.SECRETS);
            user.token = token;
            commonFunction.sendEmail(
                req.body.email,
                "Verify your account",
                '<p> Please <a href="http://localhost:3000/verify?token=' +
                token +
                '"> Click Here </a> to verify.</p>'
            );
            res.status(200).send({ Verify: "Successfully verified the user." });
        } else {
            res.status(400).send({ Verify: "The username or email does not exists" });
        }
    });
});

//verification for forgot password
router.post("/verification", async(req, res) => {
    let hashPass;
    let special = "@#%!";
    let password = Math.random().toString(36).substring(5);
    password += special.charAt(Math.floor(Math.random() * special.length));
    password += Math.random().toString(36).substring(3).toUpperCase();

    bcrypt.genSalt(process.env.SALT_FACTOR, (err, salt) => {
        if (err) {
            boom.boomify(err);
        }

        bcrypt.hash(password, salt, null, (err, hash) => {
            if (err) {
                boom.boomify(err);
            }
            hashPass = hash;
        });
    });

    await Users.findOneAndUpdate({ $or: [{ username: req.body.username }, { email: req.body.username }] }, { $set: { Password: hashPass } }, { new: true },
        (err, doc) => {
            if (err) {
                boom.boomify(err);
                res.status(500).send("Internal server error");
            } else if (doc) {
                let html = `<h1>Password was reset</h1> <br> <p>These are your login details: <br><b> Username: ${doc.username}</b><br><b>Password: ${password}</b><br> </p>`;
                commonFunction.sendEmail(
                    doc.email,
                    "Successfully Reset Password",
                    html
                );
                res.status(200).send({ Verify: "Successfully reset the password" });
            } else {
                res.status(400).send({ Verify: "The user does not exists" });
            }
        }
    );
});

//refreshing the token this
router.post("/refresh", async(req, res) => {

    try {
        Users.findOne({ username: req.body.username }, (err, user) => {

            if (err) {
                res.status(500).send({ User: "Error finding user" })
            } else if (user) {
                var loggedUser = {
                    _id: user._id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    gender: user.gender,
                    genderPreference: user.genderPreference,
                    bio: user.bio,
                    status: user.status,
                    profileImage: user.profileImage,
                    images: user.images,
                    active: user.active,
                    date: user.date,
                    age: user.age,
                    dob: user.dob,
                    interests: user.interests,
                    likes: user.likes,
                    dislikes: user.dislikes,
                };
                const token = jwt.sign(loggedUser, process.env.SECRETS);
                const refreshToken = jwt.sign(
                    loggedUser,
                    process.env.REFRESHTOKENSECRETS, { expiresIn: process.env.REFRESHTOKENLIFE }
                );
                const response = {
                    username: req.body.username,
                    Token: token,
                    RefreshToken: refreshToken,
                };
                const auth = new Auth(response);
                auth.save();
                const resp = {
                    Token: token,
                    RefreshToken: refreshToken,
                };
                res.status(200).send(resp);
            } else {
                res.status(400).send({ User: "Cannot find the user you are looking for" })
            }
        });
    } catch (error) {
        boom.boomify(error);
    }
})


//user logging out
router.post("/logout", async(req, res) => {
    console.log(req.body);
    try {
        var date = new Date(Date.now()).toLocaleString();
        await Users.findOneAndUpdate({ username: req.body.username }, { lastseen: date }, async (err, doc) => {
            if (err) {
                res.status(500).send({ User: "Error updating the user you hear" });
            } else if (doc) {

                console.log("We are now here");
                await Auth.deleteMany({ username: req.body.username }, (err, doc) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Internal server error");
                    } else {
                        res.status(200).send({ User: "User successfully logged out" });
                    }
                });

            }
        });

    } catch (error) {
        boom.boomify(error);
    }
});

module.exports = router;