import { cardsSizes } from "../../common/enums";

const _generateRolesEntries = () => {
  return Object.values(cardsSizes).map((type) => ({
    default: !!(type == cardsSizes._DEFAULT),
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("design-card-size-types", [
      ..._generateRolesEntries(),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("design-card-size-types", null, {});
  },
};
