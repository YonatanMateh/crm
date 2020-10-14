const dotenv = require('dotenv');
const path = require('path');
const envFound = dotenv.config({ path: path.join(__dirname , '../', `/.env.${process.env.NODE_ENV}`)});

if (envFound.error) {
  console.log(envFound.error);
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    port: process.env.PORT,
    environment: process.env.NODE_ENV
};