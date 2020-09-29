const clientService = require('../services/client.update.service');
const tempData = require('./tempData.json');

const migrateAllData = async () => {
    for (let client of tempData) {
        const [firstName, lastName] = client.name.split(" ");

        client.firstName = firstName.trim();
        client.lastName = lastName.trim();
        delete client.name;
        await clientService.createClient(client);
    }
}

module.exports = {
    migrateAllData
}