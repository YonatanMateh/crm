const router = require('express').Router();
const clientController = require('../controllers/client.controller');

router.get('/', clientController.getClients);
router.get('/names', clientController.clientsNames);

router.put('/nameAndCountry', clientController.updateNameAndCountry);
router.put('/owner', clientController.changeOwnership);
router.put('/emailType', clientController.changeEmailType);
router.put('/sold', clientController.changeSoldStatus);
router.put('/update', clientController.updateClient);

router.post('/', clientController.createClient);

module.exports = router;