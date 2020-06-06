const sql = require("./db.js");

//constructor
const User = (user) => {
    this.username = user.username;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.age = user.age;
    this.dob = user.dob;
    this.date = user.date;
}

User.create = (newUser, result) => {
    sql.query("Insert INTO users SET ?", newUser, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return ;
        }

        console.log("User created: ", { userid: res.userid, ...newUser });
        result(null, { userid: res.userid, ...newUser })
    });
};

User.findById = (userid, result) => {
    sql.query(`SELECT * FROM users WHERE userid = ${userid}`, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return ;
        }

        if(res.length) {
            result(null, res[0]);
            return ;
        }

        result({kind: "not_found"}, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("Error in get all users: ", err);
            result(null, err);
            return ;
        }

        result(null, res);
    });
};

User.updateByID = (userid, user, result) => {
    sql.query(
        "UPDATE users SET email = ?, lastname = ?, firstname = ?, age = ?, dob = ?, gender = ?, genderPreference = ?, bio = ?, profileImage = ?",
        [user.email, user.lastname, user.firstname,user.age, user.dob, user.gender, user.genderPreference, user.bio, user.profileImage], 
        (err, res) => {
            if (err) {
                console.log("Error trying to update user by ID: ", err);
                return(null, err);
                return ;
            }

            if (res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return ;
            }

            result (null, { userid: userid, ...user });
        }
    );
};

User.remove = (userid, result) => {
    sql.query("DELETE FROM users WHERE userid = ?", userid, (err, res) => {
        if (err) {
            console.log("Error trying to delete by ID: ", err);
            result(null, err);
            return ;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return ;
        }

        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("Error trying to delete all users: ", errr);
            result(null, err);
            return ;
        }

        result(null, res);
    });
};

module.exports = User;