import { sequelize } from "../../../db";
import { DataTypes } from "sequelize";
import { MODEL } from "../../../constants";

export default sequelize.define(
  MODEL.OC_DELIVERY_CHARGE,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    max_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    convert_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    convert_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provincial_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
