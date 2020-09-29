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
            return existsCountry.dataValues;
        } else {
            const updateCountry = await Country.findByPk(id);
            if(updateCountry) {
                await updateCountry.update({name})
                return updateCountry;
            } else {
                throw new AppError("Can't find country id", 500)
            }
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createCountry,
    updateCountry
}