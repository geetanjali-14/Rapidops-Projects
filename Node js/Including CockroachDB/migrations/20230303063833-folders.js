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
      folderproviderId: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  }

  async function down(queryInterface) {
    await queryInterface.dropTable('folder');
  }
  
  module.exports = { up, down };
  