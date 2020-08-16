module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER } = DataTypes;
    const Owner = sequelize.define('owner', {
        firstName: {
            type: STRING(30)
        },
        lastName: {
            type: STRING(30)
        }
    });
    return Owner;
}