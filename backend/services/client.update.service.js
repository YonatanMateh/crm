const db = require('../db/connection');
const ownerService = require('./owner.service');
const countryService = require('./country.service');
const emailTypeService = require('./emailType.service');
const { updateCountry } = require('./country.service');

const Client = db.clients;

const { Op } = db.Sequelize;

const updateClientField = async (client, fieldToUpdate) => {
    try {
        const updatedClient = await Client.update({
         [fieldToUpdate]: client[fieldToUpdate]
        }, {
            where: {
                id: client.id
            }
        }
        );
        return updatedClient;
    } catch (error) {
        console.error(error);
    }
}

const updateClientAndCountry = async (client) => {
    try {
        const country = await countryService.updateCountry(client.countryId, client.countryName);
        const updatedClient = await Client.update({
            firstName: client.firstName,
            lastName: client.lastName,
            countryId: country.id,
        }, {
            where: {
                id: client.id
            }
        }
        );
        return updatedClient;
    } catch (error) {
        console.error(error);
    }
}

const createClient = async client => {
    const [newClient, didCreated] = await Client.findOrCreate({
        where: {
            firstName: client.firstName,
            lastName: client.lastName
        },
        defaults: {
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            countryId: client.countryId,
            ownerId: client.ownerId
        }
    });
    return newClient;
}
const createClientForDataMigration = async client => {
    const owner = await ownerService.createOwner(client.owner.firstName, client.owner.lastName);
    const emailType = client.emailType ? await emailTypeService.createEmailType(client.emailType) : { id: null }
    const country = await countryService.createCountry(client.country);

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
            countryId: country.id,
            ownerId: owner.id,
            emailTypeId: emailType.id
        }
    });
    return newClient;
}


module.exports = {
    createClient,
    updateClientAndCountry,
    updateClientField
}