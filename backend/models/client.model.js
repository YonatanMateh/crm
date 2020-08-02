const { DataTypes } = require('sequelize');
const db = require('../db/database');

const { STRING, INTEGER, BOOLEAN, DATE } = DataTypes;

const Client = db.define('client', {
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: STRING(30)
    },
    lastName: {
        type: STRING(30)
    },
    country_id: {
        type: INTEGER,
        references: "country",
        referencesKey: "id"
    },
    owner_id: {
        type: INTEGER,
        references: "owner",
        referencesKey: "id"
    },
    emailType_id: {
        type: INTEGER,
        references: "emailType",
        referencesKey: "id"
    },
    firstContact: {
        type: DATE
    },
    sold: {
        type: BOOLEAN
    }
}, {
  query: {
    raw:true
  }
});

module.exports = Client;