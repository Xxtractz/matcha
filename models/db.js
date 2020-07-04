const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: 3306,
});

let matchaDb = {};


/*
* ALl User Select Queries
* */

matchaDb.findById = (table, id) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from ${table} WHERE userid = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from users WHERE username = ?`,
            [username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from users WHERE email = ?`,
            [email],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.insert = (table,data)=>{
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `Insert INTO ${table} SET ?`,
            data,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
}

matchaDb.saveAuth = (userId, username, token, refreshToken) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "INSERT INTO auth (userid, username, Token, RefreshToken) VALUES (?,?,?,?)",
      [userId, username, token, refreshToken],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.updateAuth = (username, token, refreshToken) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "UPDATE users SET lastseen = ? WHERE username = ?",
      [token, refreshToken, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.updateUserById = (userid, user) => {
    console.log(user);
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `UPDATE users SET ? WHERE userid = ?`,
            [user,
                userid,
            ],
            (err, results) => {
                console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.updateUserByUsername = (username, user) => {
    console.log(user);
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `UPDATE users SET ? WHERE username = ?`,
            [user,
                username,
            ],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.updateStatus = (username, status) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "UPDATE users SET status = ? WHERE username = ?",
            [status, username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.addLastSeen = (username, lastSeen) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "UPDATE users SET lastseen = ? WHERE username = ?",
      [lastSeen, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.removeSession = (username) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "DELETE FROM auth WHERE username = ?",
      [username],
      (err, results) => {
        console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};


/*
* Interests  Start Here
*/

filterInterests = (currentInterests, newInterests) => newInterests.filter(interest => !currentInterests.includes(interest))


matchaDb.getInterests = (userid) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT interest from interests  WHERE userid = ?`,
            [userid],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

matchaDb.addInterests = (userid,interests = []) => {
    const currentInterests = this.getInterests(userId);
    const interestsToAdd = filterInterests(currentInterests, interests);
    const interestsToDelete = filterInterests(interests, currentInterests);


    return new Promise((resolve, reject) => {
        try{
            if (interestsToDelete.length > 0){
                for (let interestToDelete of interestsToDelete) {
                    poolConnection.query(
                        `DELETE FROM interests WHERE userid = ? AND interest = ?`,
                        [userid,interestToDelete.toLocaleString()],
                        (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            if (interestsToAdd.length >! 0)
                            {
                                return resolve(results[0]);
                            }
                        }
                    );
                }
            }
            if (interestsToAdd.length > 0){
                for (let interestToAdd of interestsToAdd) {
                    poolConnection.query(
                        `Insert INTO interests SET userid = ?, interest = ?`,
                        [userid,interestToAdd.toLocaleString()],
                        (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(results[0]);
                        }
                    );
                }
            }
        }catch (e) {

        }
    });
}

/*
* Interests  Start Ends Here
*/


matchaDb.getOnlineUsers = () => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "SELECT userid FROM users WHERE lastseen=?",
            'online',
            (err, results) => {
                console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}


matchaDb.getRandomUsers = (gender) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "SELECT * FROM users WHERE gender=? AND ( age BETWEEN 20 AND 50) LIMIT 15",
            [gender],
            (err, results) => {
                console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

module.exports = matchaDb;

