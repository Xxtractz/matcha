const sql = require("./db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//constructor
const User = function(user){
    this.username = user.username;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password;
    this.email = user.email;
    this.age = user.age;
    this.dob = user.dob;
    this.date = user.date;
}

//registering a user
User.create = (newUser, result) => {
    sql.query("Insert INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }

        console.log("User created: ", { userid: res.userid, ...newUser });
        result(null, { userid: res.userid, ...newUser })
    });
};

//login in the user
User.logins = (username, password, result) => {
    sql.query("SELECT * FROM users WHERE username = ?", username, (err, res) => {
        if (err) {
            console.log("Error in logins: ", err);
            result(err, null);
            return;
        }

        if (res.length) {

            bcrypt.compare(password, res[0].password, (err, response) => {
                
                if (response) {
                    const userLog = {
                        userid: res[0].userid,
                        username: res[0].username,
                        email: res[0].email,
                        lastname: res[0].lastname,
                        firstname: res[0].firstname,
                        gender: res[0].gender,
                        genderPreference: res[0].genderPreference,
                        age: res[0].age,
                        profileImage: res[0].profileImage,
                        active: res[0].active,
                        lastseen: [0].lastseen,
                        dob: res[0].dob,
                        date: res[0].date,
                        bio: res[0].bio,
                        status: res[0].status
                    };
        
                    const token = jwt.sign(userLog, process.env.SECRETS);
                    const refreshToken = jwt.sign(
                        userLog,
                        process.env.REFRESHTOKENSECRETS, { expiresIn: process.env.REFRESHTOKENLIFE }
                    );
        
                    const userid = res[0].userid;
                    const usernameq = res[0].username; 

                    sql.query("INSERT INTO auth (userid, username, Token, RefreshToken) VALUES (?,?,?,?)", [ userid, usernameq, token, refreshToken ], (err, res) => {
                        if (err) {
                            console.log("Error ", err);
                            result(err, null);      
                            return;
                        }
        
                        result(null, userLog);
                        return;
                    });
                } else {
                    result({ kind: "Bad_Credencials" }, null);
                    return;
                }

            });

        }

        result({ kind: "not_found" }, null);
    });
};

//find a user using their id
User.findById = (userid, result) => {
    sql.query(`SELECT * FROM users WHERE userid = ${userid}`, (err, res) => {
        if (err) {
            console.log("Error in findById: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

//chenge the user password
User.changesPassword = (username, password, result) => {
    sql.query("UPDATE users SET password = ? WHERE username = ?", [password, username], (err, res) => {
        if (err) {
            console.log("Error trying to update password: ", err)
            return (null, err);
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { userid: userid, ...res[0] });
    });
};

//check if the email exists before registrations or when updating the email
User.checksEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = ${email}`, (err, res) => {
        if (err) {
            console.log("Error in checksEmails: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

//check if a username exists before registration
User.checksUsername = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username = ${username}`, (err, res) => {
        if (err) {
            console.log("Error in checksUsername: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

//check if the token is valid
User.checksToken = (username, result) => {
    sql.query("SELECT * FROM auth WHERE username = ?", username, (err, res) => {
        if (err) {
            console.log("Error in checksToken: ", err);
            result(err, null);
            return ;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

//verifies user after redistration
User.verifysReg = (username, result) => {
    sql.query("UPDATE users SET status = ? WHERE username = ?", ["1", username], (err, res) => {
        if (err) {
            console.log("Error in verifysReg: ", err);
            result(null, err);
            return ;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, {username: username, ...res[0]});
    });

};

//refreshes the token
User.refreshsToken = (username, result) => {
    sql.query("SELECT * FROM users WHERE username = ?", username, (err, res) => {
        if (err) {
            console.log("Error in refreshsToken: ", err);
            result(null, err);
            return;
        }
        var loggedUser = {
            userid: res[0].userid,
            username: res[0].username,
            firstname: res[0].firstname,
            lastname: res[0].lastname,
            email: res[0].email,
            gender: res[0].gender,
            genderPreference: res[0].genderPreference,
            bio: res[0].bio,
            status: res[0].status,
            profileImage: res[0].profileImage,
            images: res[0].images,
            active: res[0].active,
            date: res[0].date,
            age: res[0].age,
            dob: res[0].dob,
            interests: res[0].interests,
            likes: res[0].likes,
            dislikes: res[0].dislikes,
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

        sql.query("UPDATE auth SET Token = ?, RefreshToken = ? WHERE username = ?", [response.Token, response.RefreshToken, username], (err, res) => {
            if (err) {
                console.log("Error in refreshsToken update ", err);
                result(null, err);
                return ;
            }
        });

        result(null, response);
    });
};

//logout user and update their last seen
User.logoutUser = (username, result) => {
    var date = new Date(Date.now()).toLocaleString();
    sql.query("UPDATE users SET lastseen = ?, WHERE username = ?", [date, username], (err, res) => {
        if (err) {
            console.log("Error in logout user");
            result(null, err);
            return ;
        }

        if (affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        sql.query("DELETE FROM auth WHERE username = ?", username, (err, res) => {
            if (err) {
                console.log("Error in logoutUser delete ", err);
                result(null, err);
                return;
            }

            if (affectedRows === 0) {
                result({ kind: "not_found" }, null);
                return ;
            }
        });

        result(null, res[0]);
    });
};

//get all the users in the database
User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("Error in get all users: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

//used to update the password at forgot password
User.verifications = (username, password, result) => {
    sql.query("UPDATE users SET password = ? WHERE username = ?", [password, username], (err, res) => {
        if (err) {
            console.log("Error trying to update password: ", err)
            return (null, err);
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { userid: userid, ...res[0] });
    });
};

//verification for invalid token and getting new token
User.verifysAgain = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = ?`, email, (err, res) => {
        if (err) {
            console.log("Error in verifysAgain: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

//update the user by id
User.updateByID = (userid, user, result) => {
    sql.query(
        "UPDATE users SET email = ?, lastname = ?, firstname = ?, age = ?, dob = ?, gender = ?, genderPreference = ?, bio = ?, profileImage = ? WHERE userid = ?",
        [user.email, user.lastname, user.firstname, user.age, user.dob, user.gender, user.genderPreference, user.bio, user.profileImage, userid],
        (err, res) => {
            if (err) {
                console.log("Error trying to update user by ID: ", err);
                return (null, err);
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { userid: userid, ...user });
        }
    );
};

//remove one user by id
User.remove = (userid, result) => {
    sql.query("DELETE FROM users WHERE userid = ?", userid, (err, res) => {
        if (err) {
            console.log("Error trying to delete by ID: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

//remove all the users in the database
User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("Error trying to delete all users: ", errr);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = User;