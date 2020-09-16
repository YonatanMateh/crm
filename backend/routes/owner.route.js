const router = require('express').Router();
const ownerController = require('../controllers/owner.controller');

router.get('/', ownerController.getOwnersNames);


module.exports = router;