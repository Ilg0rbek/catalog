import { DataTypes } from "sequelize";


const init = (orm) => {
  const Token = orm.define(
    "tokens",
    {
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );
   
  return Token;
};

export default init
