import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Store from "./store.js";

// 定义Product模型
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "商品ID",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "商品名称",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "商品描述",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "价格",
    },
    status: {
      type: DataTypes.ENUM('published', 'draft'),
      allowNull: false,
      defaultValue: 'draft',
      comment: "状态",
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "封面图片URL",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "创建时间",
    },
    total_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "商品总数",
    },
    available_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "可销售数量",
    },
    store_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "所属商铺ID",
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

// 建立与Store模型的关联
Product.belongsTo(Store, {
  foreignKey: 'store_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default Product;