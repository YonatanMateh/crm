const router = require('express').Router();
const emailTypeController = require('../controllers/emailType.controller')
router.get('/', emailTypeController.getEmailTypes);


module.exports = router;