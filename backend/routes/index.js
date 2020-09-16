const router = require('express').Router();
const clientsRoute = require('./client.route');
const ownerRoute = require('./owner.route');
const emailTypeRoute = require('./emailType.route');

router.use('/clients', clientsRoute);
router.use('/owner', ownerRoute);
router.use('/emailType', emailTypeRoute)

module.exports = router;
