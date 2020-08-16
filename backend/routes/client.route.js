const router = require('express').Router();
const clientController = require('../controllers/client.controller');


router.get('/', clientController.getClients);


module.exports = router;