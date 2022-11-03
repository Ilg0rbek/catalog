export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query("CREATE EXTENSION IF NOT EXISTS pgcrypto;")
      .then(() =>
        queryInterface.sequelize.transaction((transaction) =>
          Promise.all([
            queryInterface.createTable(
              "users",
              {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER,
                },
                email: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  unique: true,
                },
                password: {
                  type: Sequelize.STRING,
                  allowNull: false,
                },
                activated: {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false,
                },
                activatedLink: {
                  type: Sequelize.STRING,
                },
                subscribe: {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false,
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
              },
              { transaction }
            ),
            queryInterface.createTable(
              "tokens",
              {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER,
                },
                refreshToken: {
                  type: Sequelize.TEXT,
                  allowNull: false,
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
      Promise.all([
        queryInterface.dropTable("users", { transaction }),
        queryInterface.dropTable("tokens", { transaction }),
      ])
    ),
};
