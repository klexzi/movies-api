import Sequelize from "sequelize";

import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USERNAME
} from "./secrets";

export const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: MYSQL_HOST
  }
);
