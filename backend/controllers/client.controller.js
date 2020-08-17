
const getClientService = require('../services/client.get.service');
const updateClientService = require('../services/client.update.service');
const updateNameAndCountry = async (req, res, next) => {
    const data = await updateClientService.updateClientAndCountry(req.body);
    res.send(data);
}

const changeOwnership = async (req, res, next) => {
    const data = await updateClientService.updateClientField(req.body, "ownerId");
    res.send(data);
}

const changeEmailType = async (req, res, next) => {
    const data = await updateClientService.updateClientField(req.body, "emailTypeId");
    res.send(data);
}

const changeSoldStatus = async (req, res, next) => {
    const data = await updateClientService.updateClientField(req.body, "sold");
    res.send(data);
}

const getClients = async (req, res, next) => {
    const { page, size, searchBy, searchText } = req.query;
    const data = await getClientService.getClients(page, size, searchBy, searchText);
    res.send({ page, size, searchBy, searchText, ...data })
}

const countByDate = async (req, res, next) => {
    const {month, year} = req.query;
    const count = await getClientService.countOfClientsForMonthYear(month, year);
    res.send({count})
}

const countEmailSent = async (req, res, next) => {
    const count = await getClientService.countEmailSent();
    res.send({count})
}

const countNotSold = async (req, res, next) => {
    const count = await getClientService.countNotSold();
    res.send({count})
}

const mostSalesByCountry = async (req, res, next) => {
    const data = await getClientService.mostSalesByCountry();
    res.send(data)
}
module.exports = {
    getClients,
    countByDate,
    updateNameAndCountry,
    changeEmailType,
    changeOwnership,
    changeSoldStatus,
    countEmailSent,
    countNotSold,
    mostSalesByCountry
}