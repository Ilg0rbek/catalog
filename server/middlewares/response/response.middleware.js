import { errorEnum } from "../../common/enums";

export default function (req, res, next) {
  try {
    if (!res.data) {
      throw new Error(errorEnum.SERVER_RESPONSE_EMPTY);
    } else {
      res.status(200).json(res.data);
    }
  } catch (e) {
    next(e);
  }
}
