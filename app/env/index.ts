import dotenv from "dotenv";

dotenv.config();

const ENV = {
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_PORT: process.env.DB_PORT || 6500,
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "root",
  PORT: process.env.PORT || 9000,
  DB_NAME: process.env.DB_NAME || "pesoappd_ocnew",
  DATABASE_URL: process.env.DATABASE_URL || `localhost:3306`,
};

export default ENV;
