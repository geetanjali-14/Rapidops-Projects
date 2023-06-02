const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('Users', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('Users');
}

module.exports = { up, down };
