import { Product, Store } from '../models/index.js';

class ProductService {
  // 获取所有商品信息
  async getAllProducts() {
    try {
      console.log('开始获取商品列表...');
      const products = await Product.findAll({
        include: [{ model: Store }]
      });
      console.log(`成功获取商品列表，共${products.length}条记录`);
      return {
        code: 0,
        data: products,
        msg: '获取成功'
      };
    } catch (error) {
      console.error('获取商品列表错误:', error.message);
      console.error('错误堆栈:', error.stack);
      return {
        code: 500,
        data: null,
        msg: `获取商品列表失败: ${error.message}`
      };
    }
  }

  // 根据ID获取商品信息
  async getProductById(productId) {
    try {
      const product = await Product.findByPk(productId, {
        include: [{ model: Store }]
      });
      if (!product) {
        return {
          code: 500,
          data: null,
          msg: '商品不存在'
        };
      }
      return {
        code: 0,
        data: product,
        msg: '获取成功'
      };
    } catch (error) {
      console.error('获取商品信息错误:', error);
      return {
        code: 500,
        data: null,
        msg: '获取商品信息失败'
      };
    }
  }

  // 创建新商品
  async createProduct(productData) {
    try {
      const { name, price, store_id } = productData;

      if (!name || !price || !store_id) {
        return {
          code: 500,
          data: null,
          msg: '商品名称、价格和所属商铺ID不能为空'
        };
      }

      // 检查商铺是否存在
      const store = await Store.findByPk(store_id);
      if (!store) {
        return {
          code: 500,
          data: null,
          msg: '所属商铺不存在'
        };
      }

      const product = await Product.create(productData);
      return {
        code: 0,
        data: product,
        msg: '创建成功'
      };
    } catch (error) {
      console.error('创建商品错误:', error);
      return {
        code: 500,
        data: null,
        msg: '创建商品失败'
      };
    }
  }

  // 更新商品信息
  async updateProduct(productId, productData) {
    try {
      const { name, price, store_id } = productData;

      if (!name || !price || !store_id) {
        return {
          code: 500,
          data: null,
          msg: '商品名称、价格和所属商铺ID不能为空'
        };
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        return {
          code: 500,
          data: null,
          msg: '商品不存在'
        };
      }

      // 如果修改了所属商铺，检查新商铺是否存在
      if (store_id !== product.store_id) {
        const store = await Store.findByPk(store_id);
        if (!store) {
          return {
            code: 500,
            data: null,
            msg: '所属商铺不存在'
          };
        }
      }

      await product.update(productData);
      return {
        code: 0,
        data: null,
        msg: '更新成功'
      };
    } catch (error) {
      console.error('更新商品错误:', error);
      return {
        code: 500,
        data: null,
        msg: '更新商品失败'
      };
    }
  }

  // 删除商品
  async deleteProduct(productId) {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return {
          code: 500,
          data: null,
          msg: '商品不存在'
        };
      }

      await product.destroy();
      return {
        code: 0,
        data: null,
        msg: '删除成功'
      };
    } catch (error) {
      console.error('删除商品错误:', error);
      return {
        code: 500,
        data: null,
        msg: '删除商品失败'
      };
    }
  }

  // 根据条件查询商品信息
  async searchProducts(query) {
    try {
      const conditions = {};
      
      if (query.name) {
        conditions.name = query.name;
      }
      
      if (query.status) {
        conditions.status = query.status;
      }
      
      if (query.store_id) {
        conditions.store_id = query.store_id;
      }
      
      const products = await Product.findAll({
        where: conditions,
        include: [{ model: Store }]
      });
      
      return {
        code: 0,
        data: products,
        msg: '查询成功'
      };
    } catch (error) {
      console.error('查询商品错误:', error);
      return {
        code: 500,
        data: null,
        msg: '查询商品失败'
      };
    }
  }

  // 获取指定商铺的所有商品
  async getProductsByStoreId(storeId) {
    try {
      const store = await Store.findByPk(storeId);
      if (!store) {
        return {
          code: 500,
          data: null,
          msg: '商铺不存在'
        };
      }

      const products = await Product.findAll({
        where: { store_id: storeId },
        include: [{ model: Store }]
      });
      
      return {
        code: 0,
        data: products,
        msg: '获取成功'
      };
    } catch (error) {
      console.error('获取商铺商品错误:', error);
      return {
        code: 500,
        data: null,
        msg: '获取商铺商品失败'
      };
    }
  }
}

export default new ProductService();