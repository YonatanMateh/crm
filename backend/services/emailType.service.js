const asyncError = require("../utils/asyncError");
const db = require("../db/connection");

const EmailType = db.emailTypes;
// const { sequelize } = db;
const { Op } = db.Sequelize;
const createEmailType = async type => {
    const [newEmailType, didCreated] = await EmailType.findOrCreate({
        where: { type },
        defaults: { type }
    });
    return newEmailType;
}

const getEmailTypes = async () => {
    const emailTypes = await EmailType.findAll({ 
        attributes: ["id", ["type", "name"]],
           where: {
            type: {[Op.ne]: null}
         },
         order: [
            ['type', 'ASC'],
        ],
})
    return emailTypes;
}

module.exports = {
    createEmailType,
    getEmailTypes
}