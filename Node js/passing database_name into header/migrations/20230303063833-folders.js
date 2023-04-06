const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Folder', {
      folder_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{model:'Users',key:'user_id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      providerId: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Folder');
  }
  module.exports = { up, down };
