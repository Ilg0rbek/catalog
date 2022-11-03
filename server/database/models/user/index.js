import { DataTypes } from "sequelize";

const init = (orm) => {
  const User = orm.define(
    "users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vkId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      activatedLink: {
        type: DataTypes.STRING,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
      },
      approveExpire: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
      },
      bonuses: {
        type: DataTypes.NUMERIC,
      },
      promo: {
        type: DataTypes.STRING,
      },
      referer: {
        type: DataTypes.STRING,
      }

    },
    { freezeTableName: true }
  );

  return User;
};

export default init;
