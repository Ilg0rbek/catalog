import { BOOLEAN, DataTypes } from "sequelize";
import { rolesEnum } from "../../../common/enums";

const init = (orm) => {
  const Role = orm.define(
    "images",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Role;
};

export default init;
