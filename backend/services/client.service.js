const db = require('../db/connection');
const ownerService = require('./owner.service');
const countryService = require('./country.service');
const emailTypeService = require('./emailType.service');

const Client = db.clients;

const { Op } = db.Sequelize;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: clients } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, clients, totalPages, currentPage };
};

const getClients = async (page, size, searchBy, searchText) => {
    const condition = searchBy && searchText ? { [searchBy]: { [Op.like]: `%${searchText}%` } } : {};

    const { limit, offset } = getPagination(page, size);

    const data = await Client.findAndCountAll({ where: condition, limit, offset, include: ["countries"] })
    const response = getPagingData(data, page, limit);

    return response;
}

// logic for data migration 
const createClient = async client => {
    const owner = await ownerService.createOwner(client.owner.firstName, client.owner.lastName);
    const emailType = client.emailType ? await emailTypeService.createEmailType(client.emailType) : {id: null} 
    const country = await countryService.createCountry(client.country);

    const [newClient, didCreated] = await Client.findOrCreate({
        where: {
            firstName: client.firstName,
            lastName: client.lastName
        },
        defaults: {
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            firstContact: client.firstContact,
            sold: client.sold,
            countryId: country.id,
            ownerId: owner.id,
            emailTypeId: emailType.id
    }
});
/*
   const clients = await Client.findOne({
    attributes: [
        "id",
        "firstName",
        "lastName",
        "sold",
        "firstContact",
        [db.Sequelize.col("country.name"), "countryName"],
        [db.Sequelize.col("emailType.type"), "emailType"],
    ],
    include: [
        {model: Country, attributes: []},
        {model: db.emailTypes, attributes: []},
        {model: db.owners, attributes: ["firstName", "lastName"]},
     ],
     nested: true
    });
    */
// console.log(clients);
// console.log(JSON.stringify(clients, null, 2));

// console.log(JSON.parse(JSON.stringify(clients)));
// 
    return newClient;
}

module.exports = {
    createClient,
    getClients
}