import {
  AuthService,
  UserService,
  DesignService,
  ImageService,
  WordsService,
  SettingsService,
} from "../services";
import { AuthController as Auth } from "./auth";
import { DesignController as Design } from "./design";
import { UserController as User } from "./user";
import { ImagesController as Images } from "./image";
import { WordController as Word } from "./word";
import { SettingsController as Settings } from "./settings";
const AuthController = new Auth({ AuthService });
const UserController = new User({ UserService });
const DesignController = new Design({ DesignService });
const ImagesController = new Images({ ImageService });
const WordsController = new Word({ WordsService });
const SettingsController = new Settings({ SettingsService });
export {
  AuthController,
  UserController,
  DesignController,
  ImagesController,
  WordsController,
  SettingsController,
};
