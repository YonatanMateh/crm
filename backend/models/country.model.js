module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER } = DataTypes;

    const Country = sequelize.define('country', {
        name: {
            type: STRING(30)
        }
    });
    return Country;
}