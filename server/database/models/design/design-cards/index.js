import { DataTypes } from "sequelize";

const init = (orm) => {
  const designCards = orm.define(
    "design-cards",
    {
      themeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sizeId: {
        type: DataTypes.INTEGER,
      },
      imageId: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sort: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );

  return designCards;
};

export default init;
