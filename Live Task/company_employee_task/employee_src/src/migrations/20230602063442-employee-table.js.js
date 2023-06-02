const { Sequelize } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('employee', {
    employee_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role:
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_name:
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_id:
    {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    email_id:
    {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('employee');
}

module.exports = { up, down };
