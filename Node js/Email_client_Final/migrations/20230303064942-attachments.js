const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("attachments", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    file_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: "email", key: "email_id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    message_attachment_id:
    {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  });
}
async function down(queryInterface) {
  await queryInterface.dropTable("attachments");
}

module.exports = { up, down };
