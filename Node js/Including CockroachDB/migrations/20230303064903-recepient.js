const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('recipient', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_address: {
        type: Sequelize.STRING
      },
      email_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'email',key:'email_id'}
      },
      types: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('recipient');
  }
  
  module.exports = { up, down };
  
