const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('attachments', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      File_Name: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      email_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'email',key:'email_id'}
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      path: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
  async function down(queryInterface) {
    await queryInterface.dropTable('attachments');
  }
  
  module.exports = { up, down };