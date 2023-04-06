const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Attachments', {
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
  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Attachments');
  }
  module.exports = { up, down };