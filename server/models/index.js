import sequelize from '../config/database.js';
import Store from './store.js';
import Product from './product.js';

// 初始化数据库
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
    
    // 同步所有模型到数据库
    await sequelize.sync({ alter: true });
    console.log('所有模型已同步到数据库');
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}

export {
  initDatabase,
  Store,
  Product
};