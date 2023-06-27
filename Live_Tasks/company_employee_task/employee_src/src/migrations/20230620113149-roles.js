const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("roles", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    permissions: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isMaster: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
}
async function down(queryInterface) {
  await queryInterface.dropTable("roles");
}

module.exports = { up, down };
