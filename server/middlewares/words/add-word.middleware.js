import { unsubscribeUsersRestrictions } from "../../common/constants";
import { errorEnum, studyProgressEnum } from "../../common/enums";
import { AuthRepository } from "../../database/repository";

export const userAddWordMiddleware = async (req, res, next) => {
  try {
    const { userId, type } = req.body;
    const user = await AuthRepository.getById(userId);

    if (!user.isApproved || checkIsApprovedExpire(user.approveExpire)) {
      const studyWords = await AuthRepository.getStudyWords({
        id: userId,
        type: studyProgressEnum.IN_PROGRESS,
      });
    }

    return next();
  } catch (err) {
    next(err);
  }
};

const checkIsApprovedExpire = (approveExpire) => {
  if (approveExpire) {
    if (new Date(Date.now()) > new Date(approveExpire)) {
      return true;
    }
  }
  return false;
};
