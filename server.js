const app = require("./src/app");
const dotenv = require("dotenv");
const createDatabase = require("./src/services/create-db");
const sequelize = require("./src/services/db-init");

dotenv.config();

const { SERVER_PORT } = process.env;

const startApp = async () => {
  try {
    await createDatabase();

    await sequelize.authenticate();

    console.log("Database connected");

    app.listen(SERVER_PORT, () => {
      console.log(`App is listening at http://localhost:${SERVER_PORT}`);
    });
  } catch (error) {
    console.log("Failed to open a SQL Database connection.", error.message);
    process.exit(1);
  }
};

startApp();
