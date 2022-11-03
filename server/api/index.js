import express from "express";
import path from "path";
import { init as InitAuthRoute } from "./auth/index.js";
import { init as InitUserRoute } from "./user/index.js";
import { init as InitDesignRoute } from "./design/index.js";
import { init as InitImagesRoute } from "./image/index.js";
import { init as InitWordsRoute } from "./word/index.js";
import { init as InitSettingsRoute } from "./settings/index.js";
import {
  responseMiddleware,
  validationCheckerMiddleware,
  authMiddleware,
  adminAuthMiddleware,
  userAddWordMiddleware,
} from "../middlewares/index.js";
import {
  AuthController,
  UserController,
  DesignController,
  ImagesController,
  WordsController,
  SettingsController,
} from "../controllers/index.js";

export const init = (Router) => {
  const router = new Router();

  router.use(
    "/auth",
    InitAuthRoute(
      Router,
      { AuthController },
      {
        responseMiddleware,
        validationCheckerMiddleware,
      }
    )
  );

  router.use(
    "/users",
    InitUserRoute(
      Router,
      { UserController },
      {
        responseMiddleware,
        authMiddleware,
        adminAuthMiddleware,
        validationCheckerMiddleware,
        userAddWordMiddleware,
      }
    )
  );
  router.use(
    "/design",
    InitDesignRoute(
      Router,
      { DesignController },
      {
        responseMiddleware,
        authMiddleware,
        adminAuthMiddleware,
        validationCheckerMiddleware,
      }
    )
  );

  router.use(
    "/images",
    InitImagesRoute(
      Router,
      { ImagesController },
      {
        responseMiddleware,
        authMiddleware,
        adminAuthMiddleware,
        validationCheckerMiddleware,
      }
    )
  );
  router.use(
    "/words",
    InitWordsRoute(
      Router,
      { WordsController },
      {
        responseMiddleware,
        authMiddleware,
        adminAuthMiddleware,
        validationCheckerMiddleware,
      }
    )
  );
  router.use(
    "/settings",
    InitSettingsRoute(
      Router,
      { SettingsController },
      {
        responseMiddleware,
        authMiddleware,
        adminAuthMiddleware,
      }
    )
  );
  router.use("/static", express.static(path.join(__dirname, "../public")));

  return router;
};
