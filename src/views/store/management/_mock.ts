import type { Store } from './types'

export const mockStores: Store[] = [
  {
    id: '1',
    name: '数码旗舰店',
    address: '北京市朝阳区建国路88号',
    phone: '010-12345678',
    email: 'digital@example.com',
    createdAt: '2023-09-01 08:00:00',
    description: '专营各类数码产品，包括手机、电脑、相机等。',
    owner: '张三'
  },
  {
    id: '2',
    name: '键盘专卖店',
    address: '上海市浦东新区张江高科技园区',
    phone: '021-87654321',
    email: 'keyboard@example.com',
    createdAt: '2023-09-05 10:30:00',
    description: '提供各类机械键盘、游戏键盘等产品。',
    owner: '李四'
  },
  {
    id: '3',
    name: '摄影器材店',
    address: '广州市天河区天河路123号',
    phone: '020-56781234',
    email: 'camera@example.com',
    createdAt: '2023-09-10 14:00:00',
    description: '专业摄影器材销售，包括相机、镜头、三脚架等。',
    owner: '王五'
  },
  {
    id: '4',
    name: '家居旗舰店',
    address: '深圳市南山区科技园',
    phone: '0755-98765432',
    email: 'furniture@example.com',
    createdAt: '2023-09-15 09:15:00',
    description: '提供高品质家具、家居用品等。',
    owner: '赵六'
  },
  {
    id: '5',
    name: '运动用品店',
    address: '成都市武侯区人民南路',
    phone: '028-12378945',
    email: 'sports@example.com',
    createdAt: '2023-09-20 11:00:00',
    description: '专营各类运动装备、健身器材等。',
    owner: '钱七'
  }
]