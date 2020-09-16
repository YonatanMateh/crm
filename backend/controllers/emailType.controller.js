const emailTypeService = require('../services/emailType.service');
const asyncError = require('../utils/asyncError');

const getEmailTypes = asyncError(async (req, res, next) => {
    const emailTypes = await emailTypeService.getEmailTypes();
    res.send(emailTypes);
})




module.exports = {
    getEmailTypes
}