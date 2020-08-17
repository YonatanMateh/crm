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

const updateCountry = async (id, name) => {
    try {
        const existsCountry = await Country.findOne({where: {name}});
        if(existsCountry) {
            return existsCountry
        } else {
            const updateCountry = await Country.update({name}, {where: {id}});
            return updateCountry;
        }
    } catch (error) {
        
    }
}

module.exports = {
    createCountry,
    updateCountry
}