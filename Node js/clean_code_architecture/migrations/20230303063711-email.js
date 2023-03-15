const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('email', {
      email_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      threadId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'Users',key:'user_id'}
      },
      isRead:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      MessageID:{
        type: Sequelize.INTEGER
      },
      isReplyTo:{
        type: Sequelize.STRING
      },
      isScheduledAt:{
        allowNull: false,
        type: Sequelize.DATE
      },
      Snippet:{
        allowNull: false,
        type: Sequelize.STRING
      },
      isArchieve:{
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isTrash:{
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
    });
  }
  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('email');
  }

  module.exports = { up, down };