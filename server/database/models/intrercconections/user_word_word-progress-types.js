import { DataTypes } from "sequelize";

const init = (orm) => {
  const UserWordWordStudyTypesConnector = orm.define(
    "user_word",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      days: {
        type: DataTypes.INTEGER,
      },
      lastRepeatDate: {
        type: DataTypes.DATE,
      },
      isFinish: {
        type: DataTypes.BOOLEAN,
      }
    },
    { freezeTableName: true }
  );

  return UserWordWordStudyTypesConnector;
};

export default init;
