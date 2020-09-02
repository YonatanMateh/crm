module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER, BOOLEAN, DATE, NOW } = DataTypes;
    const Client = sequelize.define('client', {
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
        firstContact: {
            type: DATE,
            defaultValue: NOW
        },
        sold: {
            type: BOOLEAN,
            defaultValue: false
        },
        email: {
            type: STRING(50)
        }
    });
    return Client;
}