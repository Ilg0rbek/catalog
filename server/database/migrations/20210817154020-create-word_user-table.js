export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.createTable(
          "user_word",
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            userId: {
              type: Sequelize.INTEGER,
              references: {
                model: "users",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            },
            wordId: {
              type: Sequelize.INTEGER,
              references: {
                model: "words",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            },
            type: {
              type: Sequelize.STRING,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
          },
          { transaction }
        ),
      ])
    ),
  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([queryInterface.dropTable("user_word", { transaction })])
    ),
};
