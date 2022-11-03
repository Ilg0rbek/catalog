import { Abstract } from "../../abstract/index.js";

export class ResetPasswordRepository extends Abstract {
  constructor({ ResetPasswordModel }) {
    super(ResetPasswordModel);
    this.ResetPasswordModel = ResetPasswordModel;
  }

  deleteByUserId(userId) {
    return this.ResetPasswordModel.destroy({
      where: {
        userId,
      },
    });
  }
}
