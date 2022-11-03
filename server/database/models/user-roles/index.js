import { DataTypes } from "sequelize";
import { rolesEnum } from "../../../common/enums";


const init = (orm) => {
  const Role = orm.define(
    "roles",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        defaultValue: rolesEnum._USER,
      },
    },
    { freezeTableName: true }
  );

  return Role;
};

export default init;
