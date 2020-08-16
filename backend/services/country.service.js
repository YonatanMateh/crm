const Country = require("../db/connection").countries;

const createCountry = async country => {
    console.log(country);
    const [newCountry, didCreated] = await Country.findOrCreate({
        where: { name: country },
        defaults: { 
           name: country 
        }
    });
    return newCountry.dataValues;
}

module.exports = {
    createCountry
}