const { User, Thought } = require('../models');

//export methods for the thoughts
module.exports = {
  //get all the thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get a single thought from Id
  //use the path api/thoughts/thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtText) =>
        !thoughtText
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughtText)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // create a new thought
  // use path /api/thoughts/userId and body expects thoughtText and username
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: dbThoughtData._id }},
          { new: true }
        )
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: "No user found with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
  },

  //update an existing thought using Id
  //use path /api/thoughts/thoughtId and body expects thoughtText and username
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: "No thought with that Id" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(500).json(err));
  },
  
  //delete a thought using Id
  //use path /api/thoughts/thoughtId 
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: "No thought with that Id"});
        return;
      }
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId }},
        )
      .then(() => {
          res.status(200).json({ message: `Successfully deleted the thought from user id ${params.userId}` });
      })
      .catch(err => res.status(500).json(err));
    })  
    .catch(err => res.status(500).json(err));
  },

  //add a reaction
  //use path /api/thoughts/thoughtId/reactions with body of reactionBody and username
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions:  body }},
      { new: true, runValidators: true }
      )
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this Id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  //delete a reaction
  //use path /api/thoughts/thoughtId/reactions/reactionId to delete a reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId }}},
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this Id" });
        return;
      }
      res.json({ message: "Successfully deleted the reaction" });
    })
    .catch(err => res.status(500).json(err));
  },
};

