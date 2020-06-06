module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.post("/users", users.create);

    app.get("/users", users.findAll);

    app.get("/users/:userid", users.findOne);

    app.put("/users/:userid", users.update);

    app.delete("/users/:userid", users.delete);

    app.delete("/users", users.deleteAll);
};