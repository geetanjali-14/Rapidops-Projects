'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmailFolder', {
      id:
      {
      type:Sequelize.DataTypes.INTEGER,
      primaryKey:true
      },
      name:Sequelize.DataTypes.STRING,
      userId:
      {
        type:Sequelize.DataTypes.INTEGER,
        references: 
        {
          model: 'User',
          key: 'id',
        },
      },
      providerId:Sequelize.DataTypes.INTEGER      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmailFolder');
  }
};
