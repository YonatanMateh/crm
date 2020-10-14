const asyncError = require('../utils/asyncError');
const statisticsService = require('../services/statistics.service');

const countByDate = asyncError(async (req, res, next) => {
    const { month, year } = req.query;
    const data = await statisticsService.countOfClientsForMonthYear(month, year);
    res.send(data)
});

const countEmailSent = asyncError(async (req, res, next) => {
    const count = await statisticsService.countEmailSent();
    res.send({ count })
})

const countOutstandingClients = asyncError(async (req, res, next) => {
    const count = await statisticsService.countOutstandingClients();
    res.send({ count })
})

const getTopEmployees = asyncError(async (req, res, next) => {
    const data = await statisticsService.getTopEmployees()
    res.send(data)
})

const getSalesByCountry = asyncError(async (req, res, next) => {
    const hotSeller = req.query.hotSeller;
    const data = await statisticsService.getSalesByCountry(hotSeller)
    res.send(data)
})

const getSalesByDate = asyncError(async (req, res, next) => {
    const dateToCompare = req.query.d;
    const hasSold = req.query.hasSold
    const {sales, date} = await statisticsService.getSalesByDate(dateToCompare, hasSold);
    res.send({
       sales, date
    })
})

const getClientAcquisition = asyncError(async (req, res, next) => {
    const d = await statisticsService.getClientAcquisition()
res.send(d)
})

module.exports = {
    countByDate,
    countEmailSent,
    countOutstandingClients,
    getTopEmployees,
    getSalesByCountry,
    getSalesByDate,
    getClientAcquisition
}