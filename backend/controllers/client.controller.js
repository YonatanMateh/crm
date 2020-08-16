
const clientService = require('../services/client.service');

const createClient = async (req, res, next) => {

}

const getClients = async (req, res, next) => {
    const { page, size, searchBy, searchText } = req.query;
    const data = await clientService.getClients(page, size, searchBy, searchText);
    // const condition = { [searchBy]: { [Op.like]: `%${searchText}%` } };
    res.send({ page, size, searchBy, searchText, ...data })

}


module.exports = {
    getClients
}