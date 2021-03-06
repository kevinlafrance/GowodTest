var UserModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    getById: async function (req, res) {
        const id = req.body.id

        const candidate = await UserModel.findOne({
            id: id
        }) 
            if (candidate) {
            return res.status(200).json(candidate);  
            } 
            return res.json({ message: "Problème de récupération d'utilisateur"})
    },

    /**
     * userController.show()
     */
    getByEmail: async function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

         const candidate = await UserModel.findOne({
                email: email,
                password: password
        }) 
         if (candidate) {
             return res.status(201).json(candidate);  
         } 
         return res.json({ message: "Mot de passe ou Email faux"})
         

        
    },

    /**
     * userController.create()
     */
    create: async function (req, res) {
        const candidate = await UserModel.findOne({
                email: req.body.email
        })
        
        if (candidate) {
            res.status(409).json({
                message: "Utilisateur déjà existant"
            }) 
        } else {

            const user = new UserModel({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                age : req.body.age,
                email : req.body.email,
                password : req.body.password
            });

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating user',
                        error: err
                    });
                }

                return res.status(201).json(user);
            });
        }
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
			user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
			user.age = req.body.age ? req.body.age : user.age;
			user.email = req.body.email ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
