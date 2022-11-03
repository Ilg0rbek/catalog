import { DataTypes, DATE } from "sequelize";

const init = (orm) => {
  const designCardSizeTypes = orm.define(
    "design-card-size-types",
    {
      type: {
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

  return designCardSizeTypes;
};

export default init;
