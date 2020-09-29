const router = require('express').Router();
const clientsRoute = require('./client.route');
const ownerRoute = require('./owner.route');
const emailTypeRoute = require('./emailType.route');
const statisticsRoute = require('./statistics.route');

router.use('/clients', clientsRoute);
router.use('/owner', ownerRoute);
router.use('/emailType', emailTypeRoute)
router.use('/statistics', statisticsRoute);


module.exports = router;
