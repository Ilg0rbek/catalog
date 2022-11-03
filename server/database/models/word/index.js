import { DataTypes } from "sequelize";

const init = (orm) => {
  const Words = orm.define(
    "words",
    {
      wordId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
      },
    },
    { freezeTableName: true }
  );

  return Words;
};

export default init;
