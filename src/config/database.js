import Sequelize from "sequelize";
import { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, ENV } from "./secrets";
console.log(MYSQL_PASSWORD);
const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: ENV === "production" ? false : console.log
  }
);

export default sequelize;
