import storeService from '../services/storeService.js';

class StoreController {
  // 获取所有商铺信息
  async getAllStores(req, res) {
    try {
      const result = await storeService.getAllStores();
      
      if (result.code === 0) {
        res.status(200).json({
          code: result.code,
          data: result.data,
          msg: result.msg
        });
      } else {
        res.status(500).json({
          code: result.code,
          data: null,
          msg: result.msg
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: null,
        msg: error.message || '获取商铺信息失败'
      });
    }
  }

  // 根据ID获取商铺信息
  async getStoreById(req, res) {
    try {
      const { id } = req.params;
      const result = await storeService.getStoreById(id);
      
      if (result.code === 0) {
        res.status(200).json({
          code: result.code,
          data: result.data,
          msg: result.msg
        });
      } else {
        res.status(500).json({
          code: result.code,
          data: null,
          msg: result.msg
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: null,
        msg: error.message || '获取商铺信息失败'
      });
    }
  }

  // 创建新商铺
  async createStore(req, res) {
    try {
      const storeData = req.body;
      const result = await storeService.createStore(storeData);
      
      if (result.code === 0) {
        res.status(201).json({
          code: result.code,
          data: result.data,
          msg: result.msg
        });
      } else {
        res.status(500).json({
          code: result.code,
          data: null,
          msg: result.msg
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: null,
        msg: error.message || '创建商铺失败'
      });
    }
  }

  // 更新商铺信息
  async updateStore(req, res) {
    try {
      const { id } = req.params;
      const storeData = req.body;
      
      const result = await storeService.updateStore(id, storeData);
      
      if (result.code === 0) {
        res.status(200).json({
          code: result.code,
          data: result.data,
          msg: result.msg
        });
      } else {
        res.status(500).json({
          code: result.code,
          data: null,
          msg: result.msg
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: null,
        msg: error.message || '更新商铺信息失败'
      });
    }
  }

  // 删除商铺
  async deleteStore(req, res) {
    try {
      const { id } = req.params;
      const result = await storeService.deleteStore(id);
      
      if (result.code === 0) {
        res.status(200).json({
          code: result.code,
          data: null,
          msg: result.msg
        });
      } else {
        res.status(500).json({
          code: result.code,
          data: null,
          msg: result.msg
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: null,
        msg: error.message || '删除商铺失败'
      });
    }
  }
}

export default new StoreController();