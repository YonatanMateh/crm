const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CRM', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  query: {
    raw:true
  }
});


module.exports = sequelize;