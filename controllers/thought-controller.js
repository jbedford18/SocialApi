const { Thought, User } = require('../models');


const thoughtController = {
  // the functions will go in here as methods

 //get all users
  getAllThoughts(req, res) {
      Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
         console.log(err);
         res.sendStatus(400);
    });
   },

  getThoughtById({ params }, res){
    Thought.findOne({ _id: params.thoughtId })
    .select('-__v')
    .then(dbThoughtData => {
          if(!dbThoughtData){
            res.status(404).json({ message: 'no thought attatched to id'});
            return;
          }
          res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(400);
  });
}, 

//create a thought

createThought( {params, body }, res){
  Thought.create(body)
  .then(({ _id }) => {
      return User.findOneAndUpdate(
          {_id: params.userId },
          { $push: { thoughts: _id }},
          {new: true }
      );
  })
  .then(dbThoughtData => {
      if(!dbThoughtData){
        res.status(404).json({ message: 'Error in thought creation'});
        return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.json(err));
},

updateThought( {params, body}, res ){
  Thought.findOneAndUpdate(
    { _id: params.thoughtId }, 
    body, { new: true }
    )
 .then(dbThoughtData => {
    if(!dbThoughtData){
      res.status(404).json({ message: 'Error in thought creation'});
       return;
    }
    res.json(dbThoughtData);
  })
  .catch(err => res.json(err));
},

deleteThought( { params }, res ){
Thought.findOneAndDelete({ _id: params.thoughtId })
.then(deletedThought => {
  if (!deletedThought) {
      return res.status(404).json({ message: 'No thought with this id!' });
  }
  
  //remove thought 

  return User.findOneAndUpdate(
      { _id: params.username },
      { $pull: { thoughts: params.thoughtId } },
      { new: true }
  );
})
.then(dbUserData => {
  res.json(dbUserData);
})
.catch(err => res.json(err));
},

//Add react
addReaction({params, body}, res){
  Thought.findOneAndUpdate(
    { _id: params.thoughtId }, 
    {$push: {reactions: body}}, { new: true }
  )
.then(dbUserData => {
  if(!dbUserData){
    res.status(404).json({ message: 'No user with this id'});
    return;
  }
    res.json(dbUserData);
  })
    .catch(err => res.json(err));
},

//Away with that though
deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
}
};
module.exports = thoughtController;