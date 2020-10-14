const db = require('../db/connection');
const { getMonthName } = require('../utils/dates');
const Client = db.clients;
const { Op } = db.Sequelize;
const { sequelize } = db;

const countOfClientsForMonthYear = async (month, year) => {
    month = month - 1 || new Date().getMonth();
    year = year || new Date().getFullYear();

    const count = await Client.count({
        where: {
            [Op.and]: [
                sequelize.where(sequelize.fn('MONTH', sequelize.col('firstContact')), month + 1),
                sequelize.where(sequelize.fn('YEAR', sequelize.col('firstContact')), year)
            ]
        }
    });
    return {
        count,
        monthName: getMonthName(month)
    }
}

const countEmailSent = async () => {
    const count = await Client.count({
        where: {
            emailTypeId: { [Op.ne]: null }
        }
    });
    return count;
}

const countOutstandingClients = async () => {
    const count = await Client.count({
        where: {
            sold: { [Op.ne]: true }
        }
    });
    return count;
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
    return clients;
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
    const dateToCompare = new Date(date || new Date().setDate(new Date().getDate() - 30));
    const sales = await Client.count({
        where: {
            firstContact: { [Op.gte]: dateToCompare },
            sold: hasSold
        },
        group: ["firstContact"]
    })
    return {
        sales: sales.splice(0, 30),
        date: dateToCompare
    }
}

// returns the number of sales between two dates
const salesByDate = async (startDate, endDate) => {
    const sales = await Client.count({
        where: {
            firstContact: {
                [Op.and]: [
                    { [Op.lt]: endDate },
                    { [Op.gt]: startDate }
                ]
            }
        },
        group: ["firstContact"]
    })
    return sales.reduce((sum, obj) => sum + obj.count, 0);
}

const getClientAcquisition = async () => {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const halfYearAgo = new Date(firstDayOfMonth)
    halfYearAgo.setMonth(firstDayOfMonth.getMonth() - 6);
    const beginning = new Date(1900)

    const lastMonthStat = await salesByDate(firstDayOfMonth, today);
    const halfYearStat = await salesByDate(halfYearAgo, firstDayOfMonth);
    const oldStat = await salesByDate(beginning, halfYearAgo);

    return [
        { name: "Last Month:", count: lastMonthStat, fill: "#95a5a6" },
        { name: "6-12 Months:", count: halfYearStat, fill: "#34495e" },
        { name: "> 12 Months:", count: oldStat, fill: "#7a5547" },
    ]
}

module.exports = {
    countOfClientsForMonthYear,
    countEmailSent,
    countOutstandingClients,
    getTopEmployees,
    getSalesByCountry,
    getSalesByDate,
    getClientAcquisition
}