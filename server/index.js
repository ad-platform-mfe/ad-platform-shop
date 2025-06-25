import express from 'express';
import cors from 'cors';
import { initDatabase } from './models/index.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// 使用API路由
app.use('/api', apiRoutes);

// 初始化数据库
initDatabase();

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});