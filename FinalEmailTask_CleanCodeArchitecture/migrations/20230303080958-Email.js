'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Email', {
      id:
      {
      type:Sequelize.DataTypes.INTEGER,
      primaryKey:true
      },
      subject:Sequelize .DataTypes.STRING,
      body:Sequelize.DataTypes.STRING,
      threadId:Sequelize.DataTypes.INTEGER,
      createdAt:Sequelize.DataTypes.INTEGER,
      userId:
      {
        type:Sequelize.DataTypes.INTEGER,
        references: 
        {
          model: 'User',
          key: 'id',
        },
      },
      isRead:Sequelize.DataTypes.BOOLEAN,
      messageId:Sequelize.DataTypes.INTEGER,
      inReplyTo:Sequelize.DataTypes.STRING,
      scheduledAt:Sequelize.DataTypes.INTEGER,
      snippet:Sequelize.DataTypes.STRING,
      isArchived:Sequelize.DataTypes.BOOLEAN,
      isTrashed:Sequelize.DataTypes.BOOLEAN  
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Email');
  }
};
