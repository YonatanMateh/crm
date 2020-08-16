const router = require('express').Router();
const clientsRoute = require('./client.route');

router.use('/api/clients', clientsRoute);

module.exports = router;
