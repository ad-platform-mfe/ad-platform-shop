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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "商铺地址",
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "联系电话",
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