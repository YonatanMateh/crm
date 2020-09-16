const db = require('../db/connection');
const Owner = db.owners;
const { sequelize } = db;
const { Op } = db.Sequelize;

const createOwner = async (firstName, lastName) => {
    const [newOwner, didCreated] = await Owner.findOrCreate({
        where: { firstName, lastName },
        defaults: { firstName, lastName }
    });
    return newOwner;
}

const getOwnersWithSearch = async (firstName, lastName) => {
    const owners = await Owner.findAll({
        attributes: [
            "id", 
            [sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'name']
        ],
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `${firstName}%` } },
                { lastName: { [Op.like]: `${lastName}%` } }
            ] 
        },
        limit: 10
    })
    return owners;
}

module.exports = {
    createOwner,
    getOwnersWithSearch
}