import { DataTypes } from "sequelize";

const init = (orm) => {
  const Settings = orm.define(
    "settings",
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    { freezeTableName: true }
  );

  return Settings;
};

export default init;
