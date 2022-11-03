import {
  UserModel,
  UserHistoryModel,
  TokenModel,
  RoleModel,
  ResetPasswordModel,
  DesignCardsModel,
  DesignCardSizeTypesModel,
  ImagesModel,
  WordsModel,
  WordUserModel,
  SettingsModel,
} from "../models/index.js";
import { AuthRepository as Auth } from "./users/user/index.js";
import { TokenRepository as Token } from "./users/token/index.js";
import { RoleRepository as Role } from "./users/role/index.js";
import { ResetPasswordRepository as ResetRepository } from "./users/reset-password/index.js";
import { DesignCardsRepository as DesignCards } from "./design/design-cards/index.js";
import { DesignCardsSizeTypesRepository as DesignCardsSizeTypes } from "./design/design-cards-size-types/index.js";
import { ImagesRepository as Images } from "./themes/images/index.js";
import { WordsRepository as Words } from "./words/words/index.js";
import { WordsUsersRepository as WordsUsers } from "./words/word-user/index.js";
import { SettingsRepository as Settings } from "./settings/index.js";

const AuthRepository = new Auth({
  UserModel,
  UserHistoryModel,
  TokenModel,
  RoleModel,
  WordsModel,
  WordUserModel,
});
const TokenRepository = new Token({ TokenModel });
const RoleRepository = new Role({ RoleModel });
const ResetPasswordRepository = new ResetRepository({ ResetPasswordModel });
const DesignCardsRepository = new DesignCards({
  DesignCardsModel,
  DesignCardSizeTypesModel,
  ImagesModel,
});
const DesignCardsSizeTypesRepository = new DesignCardsSizeTypes({
  DesignCardSizeTypesModel,
});
const ImageRepository = new Images({ ImagesModel });
const WordsRepository = new Words({ WordsModel });
const WordsUsersRepository = new WordsUsers({ WordUserModel });
const SettingsRepository = new Settings({ SettingsModel });
export {
  AuthRepository,
  TokenRepository,
  RoleRepository,
  ResetPasswordRepository,
  DesignCardsRepository,
  DesignCardsSizeTypesRepository,
  ImageRepository,
  WordsRepository,
  WordsUsersRepository,
  SettingsRepository,
};
