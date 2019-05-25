import { STRING, INTEGER } from "sequelize";

import sequelize from "../../../config/database";
const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    comment: {
      type: STRING({ length: 500 }),
      allowNull: false
    },
    ip: {
      type: STRING,
      allowNull: false
    },
    mid: {
      type: INTEGER,
      allowNull: false
    }
  },
  { timestamps: true }
);

export default Comment;
