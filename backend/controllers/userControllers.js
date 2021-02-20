const config = require("../auth.config");
const db = require("../models");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports.signup = async function(req, res) {
  const candidate = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (candidate) {
    res.status(409).json({
      message: "Email déjà existant veuillez vous connecter avec une autre adresse"
    })
  } else {

    const password = req.body.password
    const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    password: bcrypt.hashSync(password, 10),
  })
    try {
      await user.save()
      res.status(201).json(user)
    } catch(error) {
      res.send({message: error})
    }

  }
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de Passe Faux"
        });
      }

      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        age: user.age
      });
    });
};
