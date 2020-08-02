const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { port } = require('./config/index');
const db = require('./db/database');
// const clientsMigration = require('./utils/clientsMigration');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

(async () => {
    try {
        await app.listen(port);
        console.log(`server listening on port: ${port}`);

        await db.authenticate();
        console.log('Connection has been established successfully.');


        // run this line onces, for dummy data 
        //  await clientsMigration.migrateAllData()


    } catch (error) {
        console.error(error)
    }
}
)();