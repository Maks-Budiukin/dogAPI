const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const {
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  TEST_DATABASE_NAME,
} = process.env;

const sequelize = new Sequelize(TEST_DATABASE_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  dialectOptions: {
    encrypt: true,
  },
});

module.exports = sequelize;
