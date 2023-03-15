'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmailFolderAssociations', {
      emailId:
      {
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        references: 
        {
          model: 'Email',
          key: 'id',
        },
      },  
      folderId:
      {
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        references: 
        {
          model: 'EmailFolder',
          key: 'id',
        },
      },  
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmailFolderAssociations');
  }
};
