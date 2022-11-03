export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          "design-cards",
          "sizeId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "design-card-size-types",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          },
          { transaction }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn("design-cards", "themeId", { transaction }),
      ])
    ),
};
