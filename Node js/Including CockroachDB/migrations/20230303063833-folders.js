const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('folder', {
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
        references:{model:'users',key:'user_id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      folder_provider_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      folders_priority:{
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    });
  }

  async function down(queryInterface) {
    await queryInterface.dropTable('folder');
  }
  
  module.exports = { up, down };
  