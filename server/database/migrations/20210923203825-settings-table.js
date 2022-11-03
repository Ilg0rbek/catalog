export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.createTable(
          "settings",
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            key: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: false,
            },
            value: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: false,
            },
            description: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: false,
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
      Promise.all([queryInterface.dropTable("settings", { transaction })])
    ),
};
