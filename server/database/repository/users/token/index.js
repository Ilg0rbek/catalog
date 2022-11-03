import { Abstract } from "../../abstract/index.js";

export class TokenRepository extends Abstract {
  constructor({ TokenModel }) {
    super(TokenModel);
    this.TokenModel = TokenModel;
  }

  findTokenByUserId(userId) {
    return this.TokenModel.findOne({
      raw: true,
      where: {
        userId: userId,
      },
    });
  }
}
