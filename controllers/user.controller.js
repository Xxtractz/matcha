

const User = require("../models/user.model.js");
const commonFunction = require("./commonFunctions");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

exports.create = async (req, res) => {
    const date = new Date(Date.now()).toLocaleString();

    const bytes  = CryptoJS.AES.decrypt(req.body.user, 'StopShhh');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!decryptedData.fname &&
        !decryptedData.lname &&
        !decryptedData.username &&
        !decryptedData.email &&
        !decryptedData.password &&
        !decryptedData.age) {
        res.status(400).send({
            User: "Content can not be empty"
        });
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(decryptedData.password, salt, (err, hash) => {

            const user = new User({
                username: decryptedData.username,
                email: decryptedData.email,
                lastname: decryptedData.lname,
                firstname: decryptedData.fname,
                password: hash,
                age: decryptedData.age,
                dob: decryptedData.dob,
                date: date,
                status: "0"
            });

            const userLog = {
                username: decryptedData.username,
                email: decryptedData.email,
                lastname: decryptedData.lname,
                firstname: decryptedData.fname,
                password: hash,
                age: decryptedData.age,
                dob: decryptedData.dob,
                date: date,
                status: "0"
            };

            const token = jwt.sign(userLog, process.env.SECRETS);
            user.token = token;

            User.create(user, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(409).send({
                        User: err + ' Already Exist' || "Some error occurred while creating a user."
                    });
                } else {
                    commonFunction.sendEmail(
                        decryptedData.email,
                        "Verify your account",
                        '<p> Please <a href="http://localhost:3000/verify?token=' +
                        token +
                        '"> Click Here </a> to verify.</p>'
                    );
                    console.log(data);
                    res.status(200).send({user: data});
                }
            });

        });
    });

};

exports.login = async (req, res) => {
    const bytes  = CryptoJS.AES.decrypt(req.body.user, 'StopShhh');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (
        !decryptedData.username &&
        !decryptedData.password) {
        res.status(400).send({
            User: "Content can not be empty"
        });
    }

    await User.logins(decryptedData.username, decryptedData.password, (err, data) => {
        if (err) {
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: "The user does not exists"
                });
            }else if(err.kind === "notVerified"){
                res.status(401).send({User : "Account Not Verified",token:err.token});
            } else {
                res.status(500).send({
                    User: "Error getting the user with email " + decryptedData.username
                });
            }
        } else {
            res.status(200).send(data);
        }
    });

};

exports.checkEmail = (req, res) => {
    User.checksEmail(req.body.email, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send({
                    User: "That email does not exists"
                });
            } else {
                res.status(500).send({
                    User: "Error getting the user with email" + req.body.email
                });
            }
        } else {
            res.status(400).send({
                User: "The user already exists"
            });
        }
    });
};

exports.checkUsername = (req, res) => {
    User.checksUsername(req.body.username, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send({
                    User: "That username does not exists"
                });
            } else {
                res.status(500).send({
                    User: "Error getting the user with username" + req.body.email
                });
            }
        } else {
            res.status(400).send({
                User: "The user already exists"
            });
        }
    });
};

exports.verification = (req, res) => {
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

    User.verifications(req.body.username, hashPass, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: `Not found user with username ${req.body.username}.`
                });
            } else {
                res.status(500).send({
                    User: "Error updating user with username " + req.body.username
                });
            }
        } else {
            let html = `<h1>Password was reset</h1> <br> <p>These are your login details: <br><b> Username: ${doc.username}</b><br><b>Password: ${password}</b><br> </p>`;
            commonFunction.sendEmail(
                doc.email,
                "Successfully Reset Password",
                html
            );
            res.status(200).send({ Verify: "Successfully reset the password" });
        }
    });
}

exports.verifyAgain = (req, res) => {
    User.verifysAgain(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: "The user does not exists."
                });
            } else {
                res.status(500).send({
                    User: "Error checking for email verify again."
                });
            }
        } else {
            let user = {
                firstname: data.firstname,
                lastname: data.lastname,
                dob: data.dob,
                age: data.age,
                username: data.username,
                email: data.email,
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
            res.status(200).send({ User: "Successfully verified the user." });
        }
    });
}

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                User: err.message || "Some error occurred while getting users."
            });
        } else {
            res.status(200).send(data);
        }
    });

};

exports.findOne = (req, res) => {
    console.log("Trying to Find one");
    User.findById(req.params.userid, (err, user) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: `Not found user with id ${req.params.userid}.`
                });
            } else {
                res.status(500).send({
                    User: "Error getting the user with id " + req.params.userid
                });
            }
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

};

exports.changePassword = (req, res) => {
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

    User.changesPassword(req.body.username, hashPass,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        User: `Not found user with username ${req.body.username}.`
                    });
                } else {
                    res.status(500).send({
                        User: "Error updating user with ID " + req.body.username
                    });
                }
            } else {
                res.status(200).send({ User: "User was updated succesfully!!" });
            }
        }
    );
};

exports.refreshToken = (req, res) => {
    User.refreshToken(req.body.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: "Not found user with username " + req.body.username
                });
            } else {
                res.status(500).send({
                    Username: "Error finding the user with username " + req.body.username
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};

exports.checkToken = (req, res) => {
    User.checksToken(req.body.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: "Not found user with username" + req.body.username
                });
            } else {
                res.status(500).send({
                    User: "Error finding user token for user " + req.body.username
                });
            }
        } else if (data.token === req.body.token) {
            res.status(200).send({
                User: "Token is valid and belongs to the user"
            })
        } else {
            res.status(400).send({
                User: "Token is invalid"
            });
        }
    });
};

exports.verifyReg = (req, res) => {
    const data = jwt.verify(req.params.id, process.env.SECRETS);
    const username = data.username;
    console.log("++++++++++++++++++++++++++++++++++++++++++VERIFY");
    console.log(data);
    console.log("\n\n");

    User.verifysReg(username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: "Not found user with username" + username
                });
            } else {
                res.status(500).send({
                    User: "Error finding user with username " + username
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};

exports.update = (req, res) => {
    console.log("UpdateUrl");
    console.log(req);
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }

    User.updateByID(
        req.params.userid,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        User: `Not found user with id ${req.params.userid}.`
                    });
                } else {
                    res.status(500).send({
                        User: "Error updating user with ID " + req.params.userid
                    });
                }
            } else {
                res.status(200).send(data);
            }
        }
    );
};

exports.logout = async (req, res) => {
   await User.logoutUser(req.body.username.toString(), (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: "Not found user with username " + req.body.username
                });
            } else {
                res.status(500).send({
                    User: "Could not logout the user with username " + req.body.Username
                });
            }
        } else {
            res.status(200).send({ User: "User logged out successfully" })
        }
    });
};

exports.delete = (req, res) => {
    User.remove(req.params.userid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: `Not found user with ID ${req.params.userid}.`
                });
            } else {
                res.status(500).send({
                    User: "Could not delete user with ID " + req.params.userid
                });
            }
        } else {
            res.status(200).send({ User: "User was deleted successfully." });
        }
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                User: err.message || "Some error trying removing all users."
            });
        } else {
            res.status(200).send({ User: "All users were deleted successfully." });
        }
    });
};