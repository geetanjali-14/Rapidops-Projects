'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmailRecepeints', {
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
      emailAddress:Sequelize.DataTypes.STRING,
      type:Sequelize.DataTypes.STRING
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmailRecepeints');
  }
};
