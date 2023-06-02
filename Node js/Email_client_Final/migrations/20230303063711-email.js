const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("email", {
    email_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    thread_id: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: "users", key: "user_id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    is_read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    message_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_reply_to: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    is_scheduled_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "is_scheduled_at",
    },
    snippet: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    is_archieve: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    is_trash: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("email");
}

module.exports = { up, down };
