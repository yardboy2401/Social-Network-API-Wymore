//requires for express and user/thought routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//.use for users and thoughts routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

//export router 
module.exports = router;