import { body } from "express-validator";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { AuthController } = controllers;

  const { responseMiddleware, validationCheckerMiddleware, authMiddleware } = middlewares;

  router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("referer"),
    validationCheckerMiddleware,
    (req, res, next) =>
      AuthController.registration(req, res, next),
    responseMiddleware
  );

  router.post(
    "/vk",
    body("vkId").isLength({ min: 5 }),
    body("referer"),
    validationCheckerMiddleware,
    (req, res, next) =>
      AuthController.vkAuth(req, res, next),
    responseMiddleware
  )

  router.post(
    "/vk-oauth",
    validationCheckerMiddleware,
    (req, res, next) => {
      AuthController.oauthVk(req, res, next);
    },
    responseMiddleware
  )

  router.post(
    "/google",
    body("referer"),
    validationCheckerMiddleware,
    (req, res, next) =>
      AuthController.googleAuth(req, res, next),
    responseMiddleware
  )

  router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    validationCheckerMiddleware,
    (req, res, next) => AuthController.login(req, res, next),
    responseMiddleware
  );

  router.get("/activate/:link", (req, res, next) =>
    AuthController.activate(req, res, next)
  );

  router.get(
    "/refresh",
    (req, res, next) => AuthController.refresh(req, res, next),
    responseMiddleware
  );

  router.post(
    "/reset-password",
    body("email").isEmail(),
    validationCheckerMiddleware,
    (req, res, next) => AuthController.resetPassword(req, res, next),
    responseMiddleware
  );

  router.get(
    "/order/:amount",
    (req, res, next) => {
      AuthController.sendPayLink(req, res, next);
      res.redirect("/order");
    },
    responseMiddleware
  );

  router.post(
    "/reset",
    body("token").isString(),
    body("userId").isNumeric(),
    body("password").isString(),
    validationCheckerMiddleware,
    (req, res, next) => AuthController.reset(req, res, next),
    responseMiddleware
  );

  router.post(
    "/logout",
    (req, res, next) => AuthController.logout(req, res, next),
    responseMiddleware
  );
  return router;
};
