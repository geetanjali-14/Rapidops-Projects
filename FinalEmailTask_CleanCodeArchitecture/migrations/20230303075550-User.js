'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id:
      {
      type:Sequelize.DataTypes.INTEGER,
      primaryKey:true
      },
      email:Sequelize.DataTypes.STRING,
      password:Sequelize.DataTypes.STRING,
      name:Sequelize.DataTypes.STRING,
      accessToken:Sequelize.DataTypes.STRING,
      refreshToken:Sequelize.DataTypes.STRING      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};
