import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Activity = sequelize.define(
  "Activity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

export { Activity };
