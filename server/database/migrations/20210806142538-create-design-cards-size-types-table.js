export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.createTable(
          "design-cards",
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            themeId: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            },
            description:{
              type: Sequelize.STRING,
              allowNull: true,
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
      Promise.all([queryInterface.dropTable("design-cards", { transaction })])
    ),
};
