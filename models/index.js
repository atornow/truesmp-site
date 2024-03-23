const Sequelize = require('sequelize');
const sequelize = new Sequelize('user', 'usermanager', '4usermanager2play', {
  host: 'db',
  dialect: 'postgres',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./user')(sequelize, Sequelize);

module.exports = db;
