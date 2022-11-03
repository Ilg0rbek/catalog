export function associate(models) {
  const {
    UserModel,
    UserHistoryModel,
    TokenModel,
    RoleModel,
    ResetPasswordModel,
    DesignCardSizeTypesModel,
    DesignCardsModel,
    ImagesModel,
    WordsModel,
    WordUserModel,
  } = models;

  //TODO
  //word-user

  WordsModel.belongsToMany(UserModel, { through: WordUserModel });
  UserModel.belongsToMany(WordsModel, { through: WordUserModel });

  DesignCardsModel.belongsTo(DesignCardSizeTypesModel, {
    foreignKey: {
      name: "sizeId",
    },
    as: "size",
  });
  DesignCardSizeTypesModel.hasOne(DesignCardsModel, {
    foreignKey: {
      name: "sizeId",
    },
    as: "size",
  });

  DesignCardsModel.belongsTo(ImagesModel, {
    foreignKey: {
      name: "imageId",
    },
    as: "image",
  });
  ImagesModel.hasOne(DesignCardsModel, {
    foreignKey: {
      name: "imageId",
    },
    as: "image",
  });

  UserModel.hasOne(TokenModel, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  TokenModel.belongsTo(UserModel, { onDelete: "CASCADE", onUpdate: "CASCADE" });

  UserModel.hasOne(ResetPasswordModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ResetPasswordModel.belongsTo(UserModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  RoleModel.hasMany(UserModel);
  UserModel.belongsTo(RoleModel);
}
