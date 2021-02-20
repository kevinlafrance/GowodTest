const db = require("../../backend/models");
const mongoose = require('mongoose');
const User = db.users;


checkDuplicateEmail = (req, res, next) => {
  // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Cette adresse est déjà utilisée" });
        return;
      }

      next();
    });

};


const signUp = {
    checkDuplicateEmail,
  };
  
  module.exports = signUp;