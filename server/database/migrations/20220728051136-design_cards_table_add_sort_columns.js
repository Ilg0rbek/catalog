export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          "design-cards",
          "sort",
          {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          { transaction }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn("design-cards", "sort", { transaction }),
      ])
    ),
};
