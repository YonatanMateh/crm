module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER } = DataTypes;
    const Owner = sequelize.define('owner', {
        name: {
            type: STRING(70)
        }
    });
    return Owner;
}