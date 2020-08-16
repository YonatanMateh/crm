const dotenv = require('dotenv');
const envFound = dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
  console.log(envFound.error);
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    port: process.env.PORT,
    environment: process.env.NODE_ENV
};