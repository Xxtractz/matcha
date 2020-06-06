const User = require("../models/user.model");

exports.create = (req, res) => {
    var date = new Date(Date.now()).toLocaleString();
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty"
        });
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        age: req.body.age,
        dob: req.body.dob,
        date: date
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                User: err.message || "Some error occured while creating a user."
            });
        } else {
            res.status(200).send(data);
        }
    });

};

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
    User.findById(req.params.userid, (err, data) => {
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
            res.status(200).send(data)
        }
    });

};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }

    User.updateById(
        req.params.userid,
        new User(req.body),
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
