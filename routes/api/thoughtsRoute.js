const router = require('express').Router();

// import from thoughts controller
const {
    getThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// get all thoughts
router.route('/').get(getThoughts);

// get, update, delete thoughts by id
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

// create new thought
router.route('/:userId').post(createThoughts);

// add reaction
router.route('/:thoughtId/reactions').post(addReaction);

// delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// export
module.exports = router;