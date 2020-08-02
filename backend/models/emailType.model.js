const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/database');

const { STRING, INTEGER } = DataTypes;

const EmailType = db.define('emailType', {
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    emailType: {
        type: STRING(10)
    }
});

module.exports = EmailType;