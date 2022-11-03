import { multerUploadOne } from "../../helpers/image";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { SettingsController } = controllers;

  const { responseMiddleware, adminAuthMiddleware } = middlewares;

  //get all plain users
  router.put(
    "/",
    (req, res, next) => SettingsController.setProperty(req, res, next),
    responseMiddleware
  );
  router.get(
    "/all",
    (req, res, next) => SettingsController.getAll(req, res, next),
    responseMiddleware
  );
  router.get(
    "/:key",
    (req, res, next) => SettingsController.getProperty(req, res, next),
    responseMiddleware
  );

  return router;
};
