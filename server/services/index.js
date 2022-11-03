import {
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
} from "../database/repository/index.js";
import { AuthService as Auth } from "./auth/index.js";
import { DesignService as Design } from "./design/index.js";
import { ImageService as Image } from "./image/index.js";
import { SettingsService as Settings } from "./settings/index.js";
import { UserService as User } from "./user/index.js";
import { WordService as Word } from "./word/index.js";

const UserService = new User({
  AuthRepository,
  WordsRepository,
  WordsUsersRepository,
});
const AuthService = new Auth({
  AuthRepository,
  TokenRepository,
  RoleRepository,
  ResetPasswordRepository,
});
const DesignService = new Design({
  DesignCardsRepository,
  DesignCardsSizeTypesRepository,
});
const ImageService = new Image({ ImageRepository });
const WordsService = new Word({ WordsRepository });
const SettingsService = new Settings({ SettingsRepository });
export {
  AuthService,
  UserService,
  DesignService,
  ImageService,
  WordsService,
  SettingsService,
};
