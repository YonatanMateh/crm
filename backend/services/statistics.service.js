const db = require('../db/connection');
const { getMonthName } = require('../utils/dates');
const Client = db.clients;
const { Op } = db.Sequelize;
const { sequelize } = db;

const countOfClientsForMonthYear = async (month, year) => {
    month = month || new Date().getMonth() + 1
    year = year || new Date().getFullYear()
    const count = await Client.count({
        where: {
            [Op.and]: [
                sequelize.where(sequelize.fn('MONTH', sequelize.col('firstContact')), month),
                sequelize.where(sequelize.fn('YEAR', sequelize.col('firstContact')), year)
            ]
        }
    });
    return {
        count,
        monthName: getMonthName(month)
    };
}

const countEmailSent = async () => {
    const count = await Client.count({
        where: {
            emailTypeId: { [Op.ne]: null }
        }
    });
    return count
}

const countOutstandingClients = async () => {
    const count = await Client.count({
        where: {
            sold: { [Op.ne]: true }
        }
    });
    return count
}

// note: enable this first 'SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));'
const getTopEmployees = async () => {
    const clients = await Client.findAll({
        where: {
            sold: true
        },
        attributes: [
            "ownerId",
            "firstName",
            [db.Sequelize.col("owner.name"), "ownerName"],
            [sequelize.fn("count", sequelize.col("ownerId")), "sales"],
        ],
        include: { model: db.owners, attributes: [] },
        order: [[sequelize.col("sales"), "desc"]],
        limit: 3,
        group: ["ownerId"]
    })
    return clients
}

const getSalesByCountry = async (hotSeller = false) => {
    const countries = await Client.findAll({
        attributes: [
            "countryId",
            [db.Sequelize.col("country.name"), "countryName"],
            [sequelize.fn("count", sequelize.col("countryId")), "sales"]
        ],
        include: { model: db.countries, attributes: [] },
        group: ["countryId"],
        order: [[sequelize.col("sales"), "desc"]]
    })
    return hotSeller ? countries[0] : countries;
}

const getSalesByDate = async (date, hasSold = true) => {
    const sales = await Client.count({
        where: {
            firstContact: { [Op.gte]: new Date(date) },
            sold: hasSold
        },
        group: ["firstContact"]
    })

    return sales
}

module.exports = {
    countOfClientsForMonthYear,
    countEmailSent,
    countOutstandingClients,
    getTopEmployees,
    getSalesByCountry,
    getSalesByDate
}