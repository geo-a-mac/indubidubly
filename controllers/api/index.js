const router = require('express').Router();

const userRoutes = require('./user-routes');
const employerRoutes = require('./employer-routes');

router.use('/users', userRoutes);
router.use('/employers', employerRoutes);

module.exports = router;