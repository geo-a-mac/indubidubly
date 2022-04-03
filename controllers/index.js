const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const empDashboardRoutes = require('./empDashboard-routes.js');
const userDashboardRoutes = require('./userDashboard-routes');


router.use('/api', apiRoutes);
router.use('/empdashboard', empDashboardRoutes);
router.use('/userdashboard', userDashboardRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
