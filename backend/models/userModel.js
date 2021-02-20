const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserModel = new mongoose.Schema(
        {
          firstName: String,
          lastName: String,
          email: String,
          age: Number,
          password: String,
        },
);
  
UserModel.plugin(uniqueValidator, {message: 'déjà existant !'});

const User = mongoose.model('User', UserModel);

module.exports = User;