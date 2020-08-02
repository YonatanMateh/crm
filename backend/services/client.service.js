const db = require('../db/database');
const EmailType = require('../models/emailType.model');
const Country = require('../models/country.model');
const Owner = require('../models/owner.model');
const Client = require('../models/client.model');

const createOwner = async (firstName, lastName) => {
    const [newOwner, didCreated] = await Owner.findOrCreate({
        where: { firstName, lastName },
        defaults: { firstName, lastName }
    });
    return newOwner;
}

const createCountry = async country => {
    const [newCountry, didCreated] = await Country.findOrCreate({
        where: { country },
        defaults: { country }
    });
    return newCountry;
}

const createEmailType = async type => {
    const [newEmailType, didCreated] = await EmailType.findOrCreate({
        where: { emailType: type },
        defaults: { emailType: type }
    });
    return newEmailType;
}

// logic for data migration 
const createClient = async client => {
    const owner = await createOwner(client.owner.firstName, client.owner.lastName);
    const country = await createCountry(client.country);
    const emailType = await createEmailType(client.emailType);
    console.log(client);
    const [newClient, didCreated] = await Client.findOrCreate({
        where: {
            firstName: client.firstName,
            lastName: client.lastName
        },
        defaults: {
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            firstContact: client.firstContact,
            sold: client.sold,
            country_id: country.id,
            owner_id: owner.id,
            emailType_id: emailType.id
        }
    });
    return newClient;
}

module.exports = {
    createEmailType,
    createCountry,
    createOwner,
    createClient
}