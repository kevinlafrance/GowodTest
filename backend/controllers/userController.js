const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.mail,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'User Ready Baby' }))
        .catch((error) => err.status(400).json({ error}))
    })
    .catch((error) => req.status(500).json({error}))
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Erreur de mot de passe' });
          }
          res.status(200).json({
            userId: user._id,
            token: 'TOKEN'
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}







exports.login = (req, res, next) => {
    
}