import { Sequelize, DataTypes } from "sequelize";
import ENV from "../env";
const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(
      `✅ Connection to ${ENV.DATABASE_URL} has been established successfully.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };
