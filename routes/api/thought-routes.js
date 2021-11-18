const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
 } = require('../../controllers/thought-controller')
 
//get all api/thoughts

router
.route('/')
.get(getAllThought)
.post(createThought);


//api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);



router
.route('/:thoughtId/reactions')
.put(addReaction)
.delete(deleteReaction);



module.exports = router;