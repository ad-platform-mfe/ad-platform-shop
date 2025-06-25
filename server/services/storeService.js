import { Store } from '../models/index.js';

class StoreService {
  // 获取所有商铺信息
  async getAllStores() {
    try {
      console.log('开始获取商铺列表...');
      const stores = await Store.findAll();
      console.log(`成功获取商铺列表，共${stores.length}条记录`);
      return {
        code: 0,
        data: stores,
        msg: '获取成功'
      };
    } catch (error) {
      console.error('获取商铺列表错误:', error.message);
      console.error('错误堆栈:', error.stack);
      return {
        code: 500,
        data: null,
        msg: `获取商铺列表失败: ${error.message}`
      };
    }
  }

  // 根据ID获取商铺信息
  async getStoreById(storeId) {
    try {
      const store = await Store.findByPk(storeId);
      if (!store) {
        return {
          code: 500,
          data: null,
          msg: '商铺不存在'
        };
      }
      return {
        code: 0,
        data: store,
        msg: '获取成功'
      };
    } catch (error) {
      console.error('获取商铺信息错误:', error);
      return {
        code: 500,
        data: null,
        msg: '获取商铺信息失败'
      };
    }
  }

  // 创建新商铺
  async createStore(storeData) {
    try {
      const { name } = storeData;

      if (!name) {
        return {
          code: 500,
          data: null,
          msg: '商铺名称不能为空'
        };
      }

      const store = await Store.create(storeData);
      return {
        code: 0,
        data: store,
        msg: '创建成功'
      };
    } catch (error) {
      console.error('创建商铺错误:', error);
      return {
        code: 500,
        data: null,
        msg: '创建商铺失败'
      };
    }
  }

  // 更新商铺信息
  async updateStore(storeId, storeData) {
    try {
      const { name } = storeData;

      if (!name) {
        return {
          code: 500,
          data: null,
          msg: '商铺名称不能为空'
        };
      }

      const store = await Store.findByPk(storeId);
      if (!store) {
        return {
          code: 500,
          data: null,
          msg: '商铺不存在'
        };
      }

      await store.update(storeData);
      return {
        code: 0,
        data: null,
        msg: '更新成功'
      };
    } catch (error) {
      console.error('更新商铺错误:', error);
      return {
        code: 500,
        data: null,
        msg: '更新商铺失败'
      };
    }
  }

  // 删除商铺
  async deleteStore(storeId) {
    try {
      const store = await Store.findByPk(storeId);
      if (!store) {
        return {
          code: 500,
          data: null,
          msg: '商铺不存在'
        };
      }

      await store.destroy();
      return {
        code: 0,
        data: null,
        msg: '删除成功'
      };
    } catch (error) {
      console.error('删除商铺错误:', error);
      return {
        code: 500,
        data: null,
        msg: '删除商铺失败'
      };
    }
  }
}

export default new StoreService();