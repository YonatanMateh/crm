const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const config = require('./config/index');
const db = require('./db/connection');
const allowCors = require('./utils/allowCors');
// const clientsMigration = require('./utils/clientsMigration');

const app = express();

if(config.environment === "development") {
    app.use(allowCors);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

(async () => {
    try {
        await app.listen(config.port);
        console.log(`server listening on port: ${config.port}`);

        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // db.sequelize.sync({ force: true }).then(async() => {
        //     console.log("Drop and re-sync db.");
        //     // await clientsMigration.migrateAllData()
        //   }).catch(err=> {
        //       console.log(err);
        //   }) ;

        // run this line onces, for dummy data 


    } catch (error) {
        console.error(error)
    }
}
)();