import express from 'express';
const router = express.Router();
import storeController from '../controllers/storeController.js';
import productController from '../controllers/productController.js';

// 商铺信息路由
// 获取所有商铺信息
router.get('/stores', storeController.getAllStores);

// 根据ID获取商铺信息
router.get('/stores/:id', storeController.getStoreById);

// 创建新商铺
router.post('/stores', storeController.createStore);

// 更新商铺信息
router.put('/stores/:id', storeController.updateStore);

// 删除商铺信息
router.delete('/stores/:id', storeController.deleteStore);


// 商品信息路由
// 获取所有商品信息
router.get('/products', productController.getAllProducts);

// 搜索商品信息
router.get('/products/search', productController.searchProducts);

// 根据ID获取商品信息
router.get('/products/:id', productController.getProductById);

// 获取指定商铺的所有商品
router.get('/stores/:storeId/products', productController.getProductsByStoreId);

// 创建新商品
router.post('/products', productController.createProduct);

// 更新商品信息
router.put('/products/:id', productController.updateProduct);

// 删除商品信息
router.delete('/products/:id', productController.deleteProduct);


export default router;