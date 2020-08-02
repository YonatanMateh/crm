const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/database');

const { STRING, INTEGER } = DataTypes;

const Country = db.define('country', {
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    country: {
        type: STRING(30)
    }
});

module.exports = Country;