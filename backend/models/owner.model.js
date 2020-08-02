const { DataTypes } = require('sequelize');
const db = require('../db/database');

const { STRING, INTEGER } = DataTypes;

const Owner = db.define('owner', {
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
    }
});

module.exports = Owner;