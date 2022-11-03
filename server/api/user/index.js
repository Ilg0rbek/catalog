import { body } from "express-validator";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { UserController } = controllers;

  const {
    responseMiddleware,
    authMiddleware,
    adminAuthMiddleware,
    validationCheckerMiddleware,
    userAddWordMiddleware,
  } = middlewares;

  //get all plain users
  router.get(
    "/all",
    authMiddleware,
    (req, res, next) => UserController.getAllUsers(req, res, next),
    responseMiddleware
  );
  router.get(
    "/:id",
    authMiddleware,
    (req, res, next) => UserController.getUserById(req, res, next),
    responseMiddleware
  );
  router.put(
    "/approve/:id",
    authMiddleware,
    body("isApproved").isBoolean(),
    validationCheckerMiddleware,
    (req, res, next) => UserController.approveUserById(req, res, next),
    responseMiddleware
  );
  router.put(
    "/delete/:id",
    authMiddleware,
    body("isBanned").isBoolean(),
    validationCheckerMiddleware,
    (req, res, next) => UserController.setUserBanStatusById(req, res, next),
    responseMiddleware
  );

   router.put(
    "/yoomoney/update/:id",
    body("data").isObject(),
    validationCheckerMiddleware,
    (req, res, next) => UserController.updateUserById(req, res, next),
    responseMiddleware
  ); 

   router.get(
    "/yoomoney/get/:id",
    (req, res, next) => UserController.getUserById(req, res, next),
    responseMiddleware
  ); 

  router.put(
    "/:id",
    authMiddleware,
    body("data").isObject(),
    validationCheckerMiddleware,
    (req, res, next) => UserController.updateUserById(req, res, next),
    responseMiddleware
  );

  router.put(
    "/cashout/:id",
    authMiddleware,
    body("data").isObject(),
    validationCheckerMiddleware,
    (req, res, next) => UserController.cashoutRequest(req, res, next),
    responseMiddleware
  );

  // admin add promocod history
   router.post(
    "/addhistory",
    (req, res, next) => UserController.addHistory(req, res, next),
    responseMiddleware
  );

  // approve middlwear
  router.post(
    "/add/word",
    (req, res, next) => UserController.addWord(req, res, next),
    responseMiddleware
  );
  // approve middlwear
  router.put(
    "/set/word",
    userAddWordMiddleware,
    (req, res, next) => UserController.setUserWordStatus(req, res, next),
    responseMiddleware
  );
  
  router.get(
    "/checkhistory/:userId/:key/:value",
    (req, res, next) => UserController.checkHistory(req, res, next),
    responseMiddleware
  );

  router.put(
    "/deletepromo/:id",
    (req, res, next) => UserController.deletePromo(req, res, next),
    responseMiddleware
  );

  //approve middlwear
  router.get(
    "/get/words",
    (req, res, next) => UserController.getWords(req, res, next),
    responseMiddleware
  );

  return router;
};
