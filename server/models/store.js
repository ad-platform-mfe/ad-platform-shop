import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

// 定义Store模型
const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "商铺ID",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "商铺名称",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "创建时间",
    },
  },
  {
    tableName: "store",
    timestamps: false,
  }
);

export default Store;