const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("employee_roles_association", {
    employeeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    roleId: {
      allowNull: false,
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("employee_roles_association");
}

module.exports = { up, down };
