import { client } from "../config/connection.js";
import UserModelBuilder from "./user/index.js";
import UserHistoryModelBuilder from "./user-history/index.js";
import TokenModelBuilder from "./auth-token/index.js";
import RoleModelBuilder from "./user-roles/index.js";
import ResetPasswordBuilder from "./reset-password/index.js";
import DesignCardSizeTypesBuilder from "./design/design-card-size-types/index.js";
import DesignCardsBuilder from "./design/design-cards/index.js";
import ImagesModelBuilder from "./theme-image/index.js";
import WordModelBuilder from "./word/index.js";
import WordUserBuilder from "./intrercconections/user_word_word-progress-types";
import SettingsBuilder from "./settings/index.js";
import { associate } from "../config/associations.js";

const UserModel = UserModelBuilder(client);
const UserHistoryModel = UserHistoryModelBuilder(client);
const TokenModel = TokenModelBuilder(client);
const RoleModel = RoleModelBuilder(client);
const ResetPasswordModel = ResetPasswordBuilder(client);
const DesignCardSizeTypesModel = DesignCardSizeTypesBuilder(client);
const DesignCardsModel = DesignCardsBuilder(client);
const ImagesModel = ImagesModelBuilder(client);
const WordsModel = WordModelBuilder(client);
const WordUserModel = WordUserBuilder(client);
const SettingsModel = SettingsBuilder(client);

associate({
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
});

export {
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
  SettingsModel,
};

