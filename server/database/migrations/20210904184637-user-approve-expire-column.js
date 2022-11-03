export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          "users",
          "approveExpire",
          {
            type: Sequelize.DATE,
            defaultValue: Date.now(),
          },
          { transaction }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn("users", "approveExpire", { transaction }),
      ])
    ),
};
