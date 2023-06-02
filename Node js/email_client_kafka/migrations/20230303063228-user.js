const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('users', {
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
    access_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    refresh_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expiry_date:{
      type: Sequelize.INTEGER,
    }
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('users');
}

module.exports = { up, down };
