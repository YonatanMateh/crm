const db = require('../db/connection');
const Owner = db.owners;
const { sequelize } = db;
const { Op } = db.Sequelize;

const createOwner = async (name) => {
    const [newOwner, didCreated] = await Owner.findOrCreate({
        where: { name },
        defaults: { name }
    });
    return newOwner;
}

const getOwnersWithSearch = async (name) => {
    const owners = await Owner.findAll({
        attributes: [
            "id", 
            "name"
           // [sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'name']
        ],
        where: {
             name: { [Op.like]: `${name}%` } 
 
        },
        limit: 10
    })
    return owners;
}

module.exports = {
    createOwner,
    getOwnersWithSearch
}