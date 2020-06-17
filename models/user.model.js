const sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//constructor
const User = function (user) {
  this.username = user.username;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.password = user.password;
  this.email = user.email;
  this.age = user.age;
  this.dob = user.dob;
  this.date = user.date;
};

//registering a user
User.create =  async (newUser, result) => {
  try{
    let newUserDetails = await sql.insert('users',newUser);
    // sql.query("Insert INTO users SET ?", newUser, (err, res) => {
    //   if (err) {
    //     console.log("error: ", err);
    //     result(err, null);
    //     return;
    //   }
    if (newUserDetails){
      console.log("User created: ", { userid: newUserDetails.userid, ...newUserDetails });
      result(null, { userid: newUserDetails.userid, ...newUserDetails });
    }else {
      console.log("User created: ", newUserDetails);
      result(newUserDetails, null);
    }
  }catch (e) {
    console.log(e);
    if(e.code ==='ER_DUP_ENTRY'){
       let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }




  // });
};

//login in the user
User.logins = async (username, password, result) => {
  try {
    let user = await sql.findByUsername("users", username);
    if (!user) {
      result({ kind: "not_found" }, null);
    } else {
      bcrypt.compare(password, user.password, (err, response) => {
        console.log(response);
        if (response) {
          const userLog = {
            userid: user.userid,
            username: user.username,
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            gender: user.gender,
            genderPreference: user.genderPreference,
            age: user.age,
            profileImage: user.profileImage,
            active: user.active,
            lastseen: user.lastseen,
            dob: user.dob,
            date: user.date,
            bio: user.bio,
            status: user.status,
          };

          if (user.status === '0') {
            return result({ kind: "notVerified" , token: jwt.sign(userLog, process.env.SECRETS)}, null);
          } else {
            const token = jwt.sign(userLog, process.env.SECRETS);
            const refreshToken = jwt.sign(
              userLog,
              process.env.REFRESHTOKENSECRETS,
              { expiresIn: process.env.REFRESHTOKENLIFE }
            );

            const response = {
              Token: token,
              RefreshToken: refreshToken,
            };

            sql.addLastSeen(user.username, "online");

            let resultsCallback = sql.saveAuth(
              user.userid,
              user.username,
              response.Token,
              response.RefreshToken
            );
            if (resultsCallback) {
              result(null, response);
            }
          }
        } else {
          result({ kind: "Bad_Credencials" }, null);
          return;
        }
      });
    }
  } catch (err) {
    console.log("Error in logins: ", err);
    result(err, null);
    return;
  }
};

User.refreshToken = async (username, result) => {
  try {
    let user = await sql.findByUsername("users", username);
    if (!user) {
      result({ kind: "not_found" }, null);
    } else {
      const userLog = {
        userid: user.userid,
        username: user.username,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        gender: user.gender,
        genderPreference: user.genderPreference,
        age: user.age,
        profileImage: user.profileImage,
        active: user.active,
        lastseen: user.lastseen,
        dob: user.dob,
        date: user.date,
        bio: user.bio,
        status: user.status,
      };

      const token = jwt.sign(userLog, process.env.SECRETS);
      const refreshToken = jwt.sign(userLog, process.env.REFRESHTOKENSECRETS, {
        expiresIn: process.env.REFRESHTOKENLIFE,
      });

      const response = {
        Token: token,
        RefreshToken: refreshToken,
      };

      let resultsCallback = sql.updateAuth(
        user.username,
        response.Token,
        response.RefreshToken
      );
      if (resultsCallback) {
        result(null, response);
      }
    }
  } catch (err) {
    console.log("Error in logins: ", err);
    result(err, null);
    return;
  }
};

//logout user and update their last seen
User.logoutUser = async (username, result) => {
  const date = new Date(Date.now()).toLocaleString();
  let lastSeen = sql.addLastSeen(username, date);
  console.log(lastSeen);
  if (!lastSeen) {
    result({ kind: "not_found" }, null);
    return;
  } else {
    let logout = sql.removeSession(username);

    return result(null, logout);
  }
};

//find a user using their id
User.findById = async (userid, result) => {
  let user = await sql.findById(userid);
  if (!user) {
    result({ kind: "not_found" }, null);
  } else {
    result(null, user);
  }
};

//chenge the user password
User.changesPassword = (username, password, result) => {
  sql.query(
    "UPDATE users SET password = ? WHERE username = ?",
    [password, username],
    (err, res) => {
      if (err) {
        console.log("Error trying to update password: ", err);
        return null, err;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { userid: userid, ...res[0] });
    }
  );
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
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

//verifies user after redistration
User.verifysReg = async (username, result) => {
  try{
    let statusUpdate = await sql.updateStatus(username,'1');

      result(null, { username: username, statusUpdate });
  }catch (e) {
    result(e, null);
  }

  // sql.query(
  //   "UPDATE users SET status = ? WHERE username = ?",
  //   ["1", username],
  //   (err, res) => {
  //     if (err) {
  //       console.log("Error in verifysReg: ", err);
  //       result(null, err);
  //       return;
  //     }
  //
  //     if (res.affectedRows == 0) {
  //       result({ kind: "not_found" }, null);
  //       return;
  //     }
  //
  //     result(null, { username: username, ...res[0] });
  //   }
  // );
};

//get all the users in the database
User.getAll = (result) => {
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
  sql.query(
    "UPDATE users SET password = ? WHERE username = ?",
    [password, username],
    (err, res) => {
      if (err) {
        console.log("Error trying to update password: ", err);
        return null, err;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { userid: userid, ...res[0] });
    }
  );
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
    [
      user.email,
      user.lastname,
      user.firstname,
      user.age,
      user.dob,
      user.gender,
      user.genderPreference,
      user.bio,
      user.profileImage,
      userid,
    ],
    (err, res) => {
      if (err) {
        console.log("Error trying to update user by ID: ", err);
        return null, err;
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
User.removeAll = (result) => {
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
