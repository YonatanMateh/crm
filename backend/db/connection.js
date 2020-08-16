const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db.config.js");


const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.clients = require('../models/client.model')(sequelize, Sequelize);
db.countries = require("../models/country.model")(sequelize, Sequelize);
db.emailTypes = require("../models/emailType.model")(sequelize, Sequelize);
db.owners = require("../models/owner.model")(sequelize, Sequelize);


db.clients.belongsTo(db.countries);
db.clients.belongsTo(db.emailTypes);
db.clients.belongsTo(db.owners);

module.exports = db;