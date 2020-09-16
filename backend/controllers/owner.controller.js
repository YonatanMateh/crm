const ownerService = require('../services/owner.service');
const asyncError = require('../utils/asyncError');

const getOwnersNames = asyncError(async (req, res, next) => {
    const firstName = req.query.f;
    const lastName = req.query.l;
    const owners = await ownerService.getOwnersWithSearch(firstName, lastName);
    res.send(owners);
})




module.exports = {
    getOwnersNames
}