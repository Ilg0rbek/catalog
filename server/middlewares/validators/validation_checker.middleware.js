import { validationResult } from "express-validator";
import { ApiError } from "../../exeptions/api-error";

export default function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.BadRequest("Не валидные данные", errors));
  }
  next();
}
