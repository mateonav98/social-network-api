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
              res.status(404).json({ message: "No thoughts found." });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(500).json(err));

    },
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, New: true })
          .select('-__v')
          .then(thoughtData => {
              if(!thoughtData) {
                  res.status(404).json({ message: 'No thoughts found' });
                  return;
              }
              res.json(ThoughtsData);
          })
          .catch(err => res.json(err));
    },
    deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id })
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "No thoughs found with ID" });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(500).json(err));

    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { new: true, runValidators: true }
        )
          .populate({ path: "reactions", select: "-__v" })
          .select("-__v")
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "No thoughts found with this ID." });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(400).json(err));
    },
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'Could not find ID' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtControllers;