import { DataTypes } from "sequelize";

const init = (orm) => {
  const User_history = orm.define(
    "user_history",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
     key: {
        type: DataTypes.STRING,
        allowNull: false,
      },

     value: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      },
    { freezeTableName: true }
  );

  return User_history;
};

export default init;
