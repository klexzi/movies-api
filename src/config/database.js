import Sequelize from "sequelize";

import { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, ENV } from "./secrets";
const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: ENV === "production" ? false : true
  }
);

export default sequelize;
