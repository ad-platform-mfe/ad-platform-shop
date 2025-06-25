import type { Product } from './types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '高端智能降噪耳机',
    description: '沉浸式音效，长效续航，专为音乐发烧友打造。',
    price: 1299,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-01 10:00:00',
    store: '数码旗舰店',
    totalCount: 100,
    availableCount: 85
  },
  {
    id: '2',
    name: '复古机械键盘',
    description: '经典的打字机手感，RGB背光，提升你的桌面美学。',
    price: 899,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-02 11:30:00',
    store: '键盘专卖店',
    totalCount: 50,
    availableCount: 32
  },
  {
    id: '3',
    name: '4K超清网络摄像头',
    description: '远程会议、直播首选，画质清晰流畅。',
    price: 599,
    status: 'draft',
    cover:
      'https://images.pexels.com/photos/4318822/pexels-photo-4318822.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-03 15:00:00',
    store: '摄影器材店',
    totalCount: 30,
    availableCount: 30
  },
  {
    id: '4',
    name: '人体工学办公椅',
    description: '多重调节，支撑腰背，久坐不累。',
    price: 1599,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/276534/pexels-photo-276534.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-04 09:00:00',
    store: '家居生活馆',
    totalCount: 25,
    availableCount: 10
  },
  {
    id: '5',
    name: '便携式咖啡机',
    description: '随时随地享用一杯香醇的意式浓缩。',
    price: 399,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/3734035/pexels-photo-3734035.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-05 14:20:00',
    store: '咖啡用品店',
    totalCount: 60,
    availableCount: 45
  },
  {
    id: '6',
    name: '智能恒温电水壶',
    description: '精准控温，满足不同饮品的冲泡需求。',
    price: 299,
    status: 'draft',
    cover:
      'https://images.pexels.com/photos/8968233/pexels-photo-8968233.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-06 18:00:00',
    store: '厨房电器店',
    totalCount: 40,
    availableCount: 40
  },
  {
    id: '7',
    name: '多功能空气炸锅',
    description: '无油烹饪，健康美味，家庭必备。',
    price: 499,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/5966033/pexels-photo-5966033.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-07 12:00:00',
    store: '厨房电器店',
    totalCount: 35,
    availableCount: 20
  },
  {
    id: '8',
    name: '桌面高速扩展坞',
    description: 'Type-C接口，解决笔记本接口不足的烦恼。',
    price: 359,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-08 16:45:00',
    store: '数码配件店',
    totalCount: 80,
    availableCount: 65
  },
  {
    id: '9',
    name: '无线充电桌面台灯',
    description: '照明充电二合一，简约设计，光线柔和。',
    price: 199,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-09 20:00:00',
    store: '家居生活馆',
    totalCount: 120,
    availableCount: 100
  },
  {
    id: '10',
    name: '专业级三脚架',
    description: '稳定支撑，摄影摄像爱好者的得力助手。',
    price: 799,
    status: 'draft',
    cover:
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-10 13:10:00',
    store: '摄影器材店',
    totalCount: 15,
    availableCount: 15
  },
  {
    id: '11',
    name: '户外露营帐篷',
    description: '双层防雨，搭建方便，享受自然。',
    price: 699,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-11 17:30:00',
    store: '户外用品店',
    totalCount: 45,
    availableCount: 30
  },
  {
    id: '12',
    name: '智能体脂秤',
    description: '多项身体数据监测，助你科学健身。',
    price: 129,
    status: 'published',
    cover:
      'https://images.pexels.com/photos/4348633/pexels-photo-4348633.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2023-10-12 22:00:00',
    store: '健康生活馆',
    totalCount: 200,
    availableCount: 180
  }
]
