const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("authentication_tokens", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "employee",
        key: "employee_id",
      },
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expires_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("authentication_tokens");
}

module.exports = { up, down };
