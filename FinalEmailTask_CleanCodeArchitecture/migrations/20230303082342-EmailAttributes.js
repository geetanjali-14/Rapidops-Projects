'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmailAttributes', {
      id:
      {
      type:Sequelize.DataTypes.INTEGER,
      primaryKey:true
      },
      emailId:
      {
        type:Sequelize.DataTypes.INTEGER,
        references: 
        {
          model: 'Email',
          key: 'id',
        },
      },  
      fileName:Sequelize.DataTypes.STRING,
      size:Sequelize.DataTypes.INTEGER,
      type:Sequelize.DataTypes.STRING,
      path:Sequelize.DataTypes.STRING
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmailAttributes');
  }
};
