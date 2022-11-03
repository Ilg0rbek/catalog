export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query("CREATE EXTENSION IF NOT EXISTS pgcrypto;")
      .then(() =>
        queryInterface.sequelize.transaction((transaction) =>
          Promise.all([
            queryInterface.createTable(
              "reset-password",
              {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER,
                },
                resetPasswordToken: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  unique: true,
                },
                expire: {
                  type: Sequelize.DATE,
                  allowNull: false,
                },
                userId: {
                  type: Sequelize.INTEGER,
                  references: {
                    model: "users",
                    key: "id",
                  },
                  onUpdate: "CASCADE",
                  onDelete: "CASCADE",
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
              },
              { transaction }
            ),
          ])
        )
      ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([queryInterface.dropTable("reset-password", { transaction })])
    ),
};
