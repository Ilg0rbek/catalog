export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          "user_word",
          "days",
          {
            type: Sequelize.INTEGER,
          },
          { transaction }
        ),
        queryInterface.addColumn(
          "user_word",
          "lastRepeatDate",
          {
            type: Sequelize.DATE,
          },
          { transaction }
        ),
        queryInterface.addColumn(
          "user_word",
          "isFinish",
          {
            type: Sequelize.BOOLEAN,
          },
          { transaction }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn("user_word", "days", { transaction }),
        queryInterface.removeColumn("user_word", "lastRepeatDate", {
          transaction,
        }),
        queryInterface.removeColumn("user_word", "isFinish", { transaction }),
      ])
    ),
};
