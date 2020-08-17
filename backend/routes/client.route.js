const router = require('express').Router();
const clientController = require('../controllers/client.controller');


router.get('/', clientController.getClients);
router.get('/countByDate', clientController.countByDate);
router.get('/countEmailSent', clientController.countEmailSent);
router.get('/countNotSold', clientController.countNotSold);
router.get('/mostSales', clientController.mostSalesByCountry);
router.put('/nameAndCountry', clientController.updateNameAndCountry);
router.put('/owner', clientController.changeOwnership);
router.put('/emailType', clientController.changeEmailType);
router.put('/sold', clientController.changeSoldStatus);

module.exports = router;