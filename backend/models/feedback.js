import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";
import { Activity } from "./activity.js";

const Feedback = sequelize.define(
  "Feedback",
  {
    reaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

export { Feedback };
