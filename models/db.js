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

matchaDb.findByUsername = (table, username) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      `SELECT * from ${table} WHERE username = ?`,
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

