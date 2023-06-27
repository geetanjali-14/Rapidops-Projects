const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("company", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("company");
}

module.exports = { up, down };