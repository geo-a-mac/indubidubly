const router = require('express').Router();

const userRoutes = require('./user-routes');
const employerRoutes = require('./employer-routes');
const jobRoutes = require('./job-routes');
const skillRoutes = require('./skill-routes');

router.use('/users', userRoutes);
router.use('/employers', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/skills', skillRoutes);

module.exports = router;