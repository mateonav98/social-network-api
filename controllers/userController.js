const { User } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getUserById(req, res) {
        User.findOne({_id: req.params.id})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: "Could not find user" });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(500).json(err));
      },
      createUser(req, res) {
          User.create(req.body)
          .then((userData) => res.json(userData))
          .catch((err) => res.status(400).json(err)) 
      },
      updateUser(req, res) {
          User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true })
            .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: "No user found." })
              return;
            }
              res.json(userData)
            })
            .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
          User.findOneAndDelete({_id: req.params.id})
          .then((userData) => {
              if (!userData) {
                  res.status(404).json({message: "No user found."})   
                return;
            }
            res.json(userData)
          })
          .catch((err) => res.status(500).json(err));
      },
      addFriend(req, res) {
          User.findOneAndUpdate(
              { _id: req.params.id },
              { $addToSet: { friends: req.params.friendsId } },
              { new: true })
              .then((userData) => {
                  if(!userData) {
                      res.status(404).json({ message: 'No user found' });
                      return;
                    }
                    res.json(userData)
                })
                .catch(err => res.status(400).json(err));
      },
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.params.friendsId } },
          { new: true })
          .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: "no user found." });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(400).json(err));
      }
}
