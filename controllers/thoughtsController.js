const { Thoughts, User } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thoughts.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    getThoughtsById(req, res) {
        Thoughts.findOne({ _id: req.params.id })
          .populate({ path: "reactions", select: "-__v"})
          .select("-__v")
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "No thoughts found." });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(500).json(err));
    },
    createThoughts(req, res) {
        Thoughts.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "No user found." });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(500).json(err));

    },
    updateThoughts() {

    },
    deleteThoughts() {

    },
    addReaction () {

    },
    deleteReaction() {

    }

}