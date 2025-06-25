import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('advertising', 'root', '1234', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;