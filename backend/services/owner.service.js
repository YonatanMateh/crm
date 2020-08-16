const Owner = require("../db/connection").owners;

const createOwner = async (firstName, lastName) => {
    const [newOwner, didCreated] = await Owner.findOrCreate({
        where: { firstName, lastName },
        defaults: { firstName, lastName }
    });
    return newOwner;
}

module.exports = {
    createOwner
}