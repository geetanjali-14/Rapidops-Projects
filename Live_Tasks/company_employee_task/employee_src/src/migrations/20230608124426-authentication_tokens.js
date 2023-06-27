const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("authentication_tokens", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "employee",
        key: "employeeId",
      },
      onDelete: 'CASCADE',
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    browser: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("authentication_tokens");
}

module.exports = { up, down };
