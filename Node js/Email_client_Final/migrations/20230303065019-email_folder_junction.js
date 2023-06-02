const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('junction', {
      email_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'email',key:'email_id'}
      },
      folder_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'folder',key:'folder_id'}
      },
    });
  }

  async function down(queryInterface) {
    await queryInterface.dropTable('junction');
  }
  
  module.exports = { up, down };
