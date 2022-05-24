const { User } = require("../models");

module.exports = {

    getUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    userById({params}, res) {
        User.findOne({_id: params.id})
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



}
