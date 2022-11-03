import { rolesEnum } from "../../common/enums";

const _generateRolesEntries = () => {
  return Object.values(rolesEnum).map((role) => ({
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [..._generateRolesEntries()]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
