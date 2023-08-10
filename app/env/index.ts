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
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || `access-key`,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || `secret-key`,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || `bucket-name`,
  PESO_APP_TEMP:
    process.env.PESO_APP_TEMP || `https://pesoapp.ph/peso_beta/api/5.2.16/url/`,
  PUSHER_APP_ID: process.env.PUSHER_APP_ID || `app-id`,
  PUSHER_KEY: process.env.PUSHER_KEY || `key`,
  PUSHER_SECRET: process.env.PUSHER_SECRET || `secret`,
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER || `cluster`,
  YT_KEY: process.env.YT_KEY || `key`,
};

export default ENV;
