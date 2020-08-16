module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER } = DataTypes;

    const EmailType = sequelize.define('emailType', {
        type: {
            type: STRING(10)
        }
    });
    return EmailType;
}