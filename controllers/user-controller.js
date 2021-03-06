const { User } = require('../models');
const mongoose = require('mongoose');
const userController = {
  // the functions will go in here as methods
  // get all user
  getAllUsers(req, res){
    User.find({})
     .populate({
         path: 'thoughts',
         select: '-__v'
     })
     .populate({
      path: "friends",
      select: "-__v",
    })
     .select('-__v')
     .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},

  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


// createuser
createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // update user by ID
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No USER found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

// delete User
deleteUser({ params }, res) {
  User.findOneAndDelete({ _id: params.id })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => res.json(err));
},

}

module.exports = userController;