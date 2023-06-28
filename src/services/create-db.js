const dotenv = require("dotenv");
const { Sequelize, DataTypes } = require("sequelize");
const { Dog } = require("../models");

dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  TEST_DATABASE_NAME,
} = process.env;

const adminConnection = new Sequelize("", DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

const createDatabase = async () => {
  try {
    const [results] = await adminConnection.query(
      `SELECT COUNT(*) AS count FROM sys.databases WHERE name = '${TEST_DATABASE_NAME}'`
    );
    const databaseExists = results[0].count > 0;

    if (databaseExists) {
      console.log(`Database ${TEST_DATABASE_NAME} already exists`);
      return;
    }

    await adminConnection.query(`
    CREATE DATABASE ${TEST_DATABASE_NAME}`);
    console.log("Database created");

    await adminConnection.query(`
    USE ${TEST_DATABASE_NAME}`);

    Dog.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
        },
        color: {
          type: DataTypes.STRING,
        },
        tail_length: {
          type: DataTypes.INTEGER,
        },
        weight: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize: adminConnection,
        tableName: "Dogs",
        timestamps: false,
      }
    );

    await adminConnection.sync();
    console.log("Table created");

    await Dog.bulkCreate([
      { name: "Neo", color: "red & amber", tail_length: 22, weight: 32 },
      { name: "Jessy", color: "black & white", tail_length: 7, weight: 14 },
    ]);
    console.log("Data added to table");
    return;
  } catch (error) {
    console.log("Failed to create or fill database.", error.message);
  }
};

module.exports = createDatabase;
