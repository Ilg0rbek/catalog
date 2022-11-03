import { body } from "express-validator";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { DesignController } = controllers;

  const {
    responseMiddleware,
    authMiddleware,
    adminAuthMiddleware,
    validationCheckerMiddleware,
  } = middlewares;

  //get all plain users
  router.get(
    "/cards/all",
    authMiddleware,
    (req, res, next) => DesignController.getAllCards(req, res, next),
    responseMiddleware
  );
  router.get(
    "/cards/:id",
    authMiddleware,
    (req, res, next) => DesignController.getCardById(req, res, next),
    responseMiddleware
  );
  router.get(
    "/cards/sizes/all",
    authMiddleware,
    (req, res, next) => DesignController.getAllCardsSizes(req, res, next),
    responseMiddleware
  );
  router.post(
    "/cards/:id",
    adminAuthMiddleware,
    (req, res, next) => DesignController.setCardById(req, res, next),
    responseMiddleware
  );

  return router;
};
