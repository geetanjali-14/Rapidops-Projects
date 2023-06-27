const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("employee", {
    employeeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    emailId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    isMaster:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });
}
async function down(queryInterface) {
  await queryInterface.dropTable("employee");
}

module.exports = { up, down };
