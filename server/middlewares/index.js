import { userAddWordMiddleware } from "./words/add-word.middleware";
import { authMiddleware, adminAuthMiddleware } from "./auth/auth.middleware";
import generalErrorHandlerMiddleware from "./exceptions/error-handler.middleware";
import wrongRouteHandler from "./exceptions/wrong_route_handler.middleware";
import responseMiddleware from "./response/response.middleware";
import validationCheckerMiddleware from "./validators/validation_checker.middleware";

export {
  authMiddleware,
  adminAuthMiddleware,
  generalErrorHandlerMiddleware,
  wrongRouteHandler,
  validationCheckerMiddleware,
  responseMiddleware,
  userAddWordMiddleware,
};
