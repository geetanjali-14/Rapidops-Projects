const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Recipient', {
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

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Recipient');
  }
  module.exports = { up, down };
