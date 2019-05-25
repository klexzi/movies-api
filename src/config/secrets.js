import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
export const MYSQL_HOST = process.env.MYSQL_HOST;

export const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

export const DB_URL = `mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DATABASE}?reconnect=true`;
