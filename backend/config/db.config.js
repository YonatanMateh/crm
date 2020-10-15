const path = require('path');
require('dotenv').config({ path: path.join(__dirname , '../',`/.env.${process.env.NODE_ENV}`)});
module.exports = {
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    db: process.env.DB,
    dialect: process.env.DIALECT,
    pool: {
      max: parseInt(process.env.POOL_MAX),
      min: parseInt(process.env.POOL_MIN),
      acquire: parseInt(process.env.POOL_ACQUIRE),
      idle: parseInt(process.env.POOL_IDLE)
    }
  };