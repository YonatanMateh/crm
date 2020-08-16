const clientService = require('../services/client.service');
const tempData = require('./tempData.json');
const createClient = async client => {
    await clientService.createClient(client);
}

const migrateAllData = async () => {
    for(let client of tempData) {
        const [firstName, lastName] = client.name.split(" ");
        const [oFirstName, oLastName] = client.owner.split(" ");

        client.firstName = firstName.trim();
        client.lastName = lastName.trim();
        client.owner = {
            firstName: oFirstName.trim(),
            lastName: oLastName.trim()
        }
        delete client.name;
        await clientService.createClient(client);
    }
}

module.exports = {
    createClient,
    migrateAllData
}