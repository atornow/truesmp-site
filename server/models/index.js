const Sequelize = require('sequelize');
const sequelize = new Sequelize('user', 'usermanager', '4usermanager2play', {
  host: 'db',
  dialect: 'postgres',
  logging: false,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfullyyy.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./user')(sequelize, Sequelize);
db.challenges = require('./challenge')(sequelize, Sequelize);

module.exports = db;
