const EmailType = require("../db/connection").emailTypes;

const createEmailType = async type => {
    const [newEmailType, didCreated] = await EmailType.findOrCreate({
        where: { type },
        defaults: { type }
    });
    return newEmailType;
}

module.exports = {
    createEmailType
}