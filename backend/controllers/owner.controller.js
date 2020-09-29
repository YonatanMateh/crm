const ownerService = require('../services/owner.service');
const asyncError = require('../utils/asyncError');

const getOwnersNames = asyncError(async (req, res, next) => {
    const name = req.query.s;
    const owners = await ownerService.getOwnersWithSearch(name);
    res.send(owners);
})

module.exports = {
    getOwnersNames
}