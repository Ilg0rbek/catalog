import { body } from "express-validator";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { WordsController } = controllers;

  const {
    responseMiddleware,
    authMiddleware,
    adminAuthMiddleware,
    validationCheckerMiddleware,
  } = middlewares;

  //get all plain users
  router.post(
    "/",
    (req, res, next) => WordsController.addWord(req, res, next),
    responseMiddleware
  );
  router.get(
    "/check/:wordId",
    (req, res, next) => WordsController.checkWordOnExists(req, res, next),
    responseMiddleware
  );
  router.get(
    "/all",
    (req, res, next) => WordsController.getAll(req, res, next),
    responseMiddleware
  );

  return router;
};
