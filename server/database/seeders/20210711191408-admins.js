import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { rolesEnum } from "../../common/enums";
import { hashPassword } from "../../helpers/utils";
import { RoleRepository } from "../repository";

dotenv.config();

const _getAdminId = async () => {
  const { id } = await RoleRepository.findOneByParams({
    role: rolesEnum._ADMIN,
  });
  return id;
};
const _addYear = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const date = new Date(year + 1, month, day);
  return date;
};
export default {
  up: async (queryInterface, Sequelize) => {
    const roleId = await _getAdminId();
    return queryInterface.bulkInsert("users", [
      {
        email: "youremail@gmail.com",
        password: hashPassword("your_password"),
        activatedLink: uuidv4(),
        activated: true,
        roleId,
        isApproved: true,
        isBanned: false,
        approveExpire: _addYear(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
