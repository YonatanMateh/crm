const db = require('../db/connection');
const ownerService = require('./owner.service');
const countryService = require('./country.service');
const emailTypeService = require('./emailType.service');
const { updateCountry } = require('./country.service');
const { emailTypes } = require('../db/connection');

const Client = db.clients;
const { sequelize } = db;
const { Op } = db.Sequelize;

const getPagination = (page, size) => {
    const limit = size ? +size : 25;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: clients } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, clients, totalPages, currentPage };
};

const getCondition = (searchBy, searchText) => {
    let defaultCondition = {};
    let countryCondition = {};
    let ownerCondition = {};
    let emailCondition = null;

    if (searchBy && searchText) {
        switch (searchBy) {
            case "Name":
                defaultCondition = {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${searchText}%` } },
                        { lastName: { [Op.like]: `%${searchText}%` } }
                    ]
                }
                break;
            case "Country":
                countryCondition = { name: { [Op.like]: `%${searchText}%` } }
                break;
            case "Owner":
                ownerCondition = {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${searchText}%` } },
                        { lastName: { [Op.like]: `%${searchText}%` } }
                    ]
                }
                break;
                case "Email": 
                emailCondition = { type: { [Op.like]: `%${searchText}%` } }
                break;
            default:
                defaultCondition = { [searchBy]: { [Op.like]: `%${searchText}%` } }
                break;
        }

    }
    return {
        defaultCondition,
        countryCondition,
        ownerCondition,
        emailCondition
        
    }
}

const getClients = async (page, size, searchBy, searchText) => {
    const { limit, offset } = getPagination(page, size);
    const {
        emailCondition,
        defaultCondition,
        countryCondition,
        ownerCondition } = getCondition(searchBy, searchText);

    const data = await Client.findAndCountAll({
        where: defaultCondition,
        limit,
        offset,
        attributes: [
            "id",
            "firstName",
            "lastName",
            "sold",
            "firstContact",
            "countryId",
            "email",
            // "emailType",
            [db.Sequelize.col("country.name"), "countryName"],
            [db.Sequelize.col("emailType.type"), "email_type"]
        ],
        include: [
            { model: db.countries, attributes: [], where: countryCondition },
            { model: db.emailTypes, attributes: [], where: emailCondition },
            { model: db.owners, attributes: ["firstName", "lastName"], where: ownerCondition },

            // { model: db.countries, attributes: [], where: countryCondition },
            // { model: db.emailTypes, attributes: [], where: emailCondition },
            // { model: db.owners, attributes: ["firstName", "lastName"], where: ownerCondition },
        ],
        nested: true
    })
    const response = getPagingData(data, page, limit);

    return response;
}


const countOfClientsForMonthYear = async (month, year) => {
    month = month || new Date().getMonth()
    year = year || new Date().getFullYear()
    const count = await Client.count({
        where:
        {
            [Op.and]: [
                sequelize.where(sequelize.fn('MONTH', sequelize.col('firstContact')), month),
                sequelize.where(sequelize.fn('YEAR', sequelize.col('firstContact')), year)
            ]
        }
    });
    return count;
}

const countEmailSent = async () => {
    const count = await Client.count({
        where: {
            emailTypeId: { [Op.ne]: null }
        }
    });
    return count
}

const countNotSold = async () => {
    const count = await Client.count({
        where: {
            sold: { [Op.ne]: true }
        }
    });
    return count
}

const mostSalesByCountry = async () => {
    const countries = await Client.findAll({
        attributes: [
            "countryId",
            [db.Sequelize.col("country.name"), "countryName"],
            [sequelize.fn("count", sequelize.col("countryId")), "amount"]
        ],
        include:  { model: db.countries, attributes: [] },
        group: ["countryId"],
        order: [[sequelize.col("amount"), "DESC"]]
    })
    return countries[0];
}
module.exports = {
    getClients,
    countOfClientsForMonthYear,
    countEmailSent,
    countNotSold,
    mostSalesByCountry
}