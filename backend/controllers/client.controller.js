
const getClientService = require('../services/client.get.service');
const updateClientService = require('../services/client.update.service');
const asyncError = require('../utils/asyncError');

const updateClient = asyncError(async (req, res, next) => {
    const { id, field, text } = req.body
    const client = await updateClientService.updateClientForField(id, field, text);
    res.send(client);
})
const updateNameAndCountry = asyncError(async (req, res, next) => {
    const data = await updateClientService.updateClientAndCountry(req.body);
    res.send(data);
})

const changeOwnership = asyncError(async (req, res, next) => {
    const data = await updateClientService.updateClientField(req.body, "ownerId");
    res.send(data);
})

const changeEmailType = asyncError(async (req, res, next) => {
    const data = await updateClientService.updateClientField(req.body, "emailTypeId");
    res.send(data);
})

const changeSoldStatus = asyncError(async (req, res, next) => {
    const data = await updateClientService.updateClientField(req.body, "sold");
    res.send(data);
})

const getClients = asyncError(async (req, res, next) => {
    const { page, size, searchBy, searchText } = req.query;
    const data = await getClientService.getClients(page, size, searchBy, searchText);
    res.send({ page, size, searchBy, searchText, ...data })
})

const clientsNames = asyncError(async (req, res, next) => {
    const firstName = req.query.f;
    const lastName = req.query.l;
    const data = await getClientService.clientsNames(firstName, lastName);
    res.send(data)
});

const createClient = asyncError(async (req, res, next) => {
    const newClient = await updateClientService.createClient(req.body);
    res.send(newClient);
});

module.exports = {
    getClients,
    updateNameAndCountry,
    changeEmailType,
    changeOwnership,
    changeSoldStatus,
    clientsNames,
    updateClient,
    createClient
}