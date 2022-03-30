const router = require('express').Router();

const userRoutes = require('./user-routes');
const employerRoutes = require('./employer-routes');
const jobRoutes = require('./job-routes');

router.use('/users', userRoutes);
router.use('/employers', employerRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;