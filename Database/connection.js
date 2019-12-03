const Sequelize = require('sequelize');

module.exports = new Sequelize('Movies_Director_Orm', 'prakhar', 'Kochikame02@', {
    host: 'localhost',
    dialect: 'mysql',
  });