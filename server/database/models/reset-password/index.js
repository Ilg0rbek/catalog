import { DataTypes, DATE } from "sequelize";


const init = (orm) => {
  const resetPassword = orm.define(
    "reset-password",
    {
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expire: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return resetPassword;
};

export default init;
