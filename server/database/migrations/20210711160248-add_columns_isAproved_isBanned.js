export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          "users",
          "isApproved",
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          
          },
          { transaction }
        ),
        queryInterface.addColumn(
          "users",
          "isBanned",
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          
          },
          { transaction }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn("users", "isApproved", { transaction }),
        queryInterface.removeColumn("users", "isBanned", { transaction }),
      ])
    ),
};
