import { rolesEnum } from "../../common/enums";
import { ApiError } from "../../exeptions/api-error";
import { tokenHelper } from "../../helpers/token/token.helper";

function authBuilder(...rols) {
  return function (req, res, next) {
    try {
      const authHeader = req.header("authorization");

      if (!authHeader) {
        return next(ApiError.UnauthorizedError());
      }
      const accessToken = authHeader.split(" ")[1]; // Bearer token

      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = tokenHelper.validateAccessToken(accessToken);

      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }

      if (!userData.role) {
        return next(ApiError.UnauthorizedError());
      }

      const isInclude = rols.some((el) => el == userData.role);

      if (!isInclude) {
        return next(ApiError.UnauthorizedError());
      }
      req.user = userData;
      return next();
    } catch (err) {

      return next(ApiError.UnauthorizedError());
    }
  };
}

const adminAuthMiddleware = authBuilder(rolesEnum._ADMIN);

const authMiddleware = authBuilder(rolesEnum._ADMIN, rolesEnum._USER);

export { adminAuthMiddleware, authMiddleware };
