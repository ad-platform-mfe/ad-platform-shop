import productService from '../services/productService.js';

class ProductController {
  // 获取所有商品信息
  async getAllProducts(req, res) {
    try {
      const result = await productService.getAllProducts();
      
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
        msg: error.message || '获取商品信息失败'
      });
    }
  }

  // 根据ID获取商品信息
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const result = await productService.getProductById(id);
      
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
        msg: error.message || '获取商品信息失败'
      });
    }
  }

  // 创建新商品
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const result = await productService.createProduct(productData);
      
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
        msg: error.message || '创建商品失败'
      });
    }
  }

  // 更新商品信息
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      
      const result = await productService.updateProduct(id, productData);
      
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
        msg: error.message || '更新商品信息失败'
      });
    }
  }

  // 删除商品
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id);
      
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
        msg: error.message || '删除商品失败'
      });
    }
  }

  // 搜索商品信息
  async searchProducts(req, res) {
    try {
      const query = req.query;
      const result = await productService.searchProducts(query);
      
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
        msg: error.message || '搜索商品信息失败'
      });
    }
  }

  // 获取指定商铺的所有商品
  async getProductsByStoreId(req, res) {
    try {
      const { storeId } = req.params;
      const result = await productService.getProductsByStoreId(storeId);
      
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
        msg: error.message || '获取商铺商品失败'
      });
    }
  }
}

export default new ProductController();