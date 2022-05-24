const router = require('express').Router();

const usersRoutes = require('./userRoutes');
const thoughtsRoute = require('./thoughtsRoute');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoute);

module.exports = router;