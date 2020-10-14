const router = require('express').Router();
const statisticsController = require('../controllers/statistics.controller');

router.get('/countByDate', statisticsController.countByDate);
router.get('/countEmailSent', statisticsController.countEmailSent);
router.get('/countOutstandingClients', statisticsController.countOutstandingClients);

router.get('/topEmployees', statisticsController.getTopEmployees);
router.get('/salesByCountry', statisticsController.getSalesByCountry);
router.get('/salesByDate', statisticsController.getSalesByDate);
router.get('/clientAcquisition', statisticsController.getClientAcquisition);

module.exports = router;

