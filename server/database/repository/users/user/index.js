import { studyProgressEnum } from "../../../../common/enums";
import { Abstract } from "../../abstract";

export class AuthRepository extends Abstract {
  constructor({ UserModel, UserHistoryModel, TokenModel, RoleModel, WordsModel }) {
    super(UserModel);

    this.UserModel = UserModel;
    this.UserHistoryModel = UserHistoryModel;
    this.TokenModel = TokenModel;
    this.RoleModel = RoleModel;
    this.WordsModel = WordsModel;
  }

  addHistory(data) {
    return this.UserHistoryModel.create(data, {
      raw: true,
    });
  }

  checkHistory(userId, key, value) {
    return this.UserHistoryModel.findOne({
      required: true,
      where: {
        userId,
        key,
        value,
      },
    });
  }

  deletePromo(key, value) {
    console.log(key, value)
      ; return this.UserHistoryModel.destroy({
        where: { key, value },
      });
  }

  findByEmail(email) {
    return this.UserModel.findOne({
      include: {
        model: this.RoleModel,
      },
      required: true,
      where: {
        email,
      },
    });
  }

  findByVkId(vkId) {
    return this.UserModel.findOne({
      include: {
        model: this.RoleModel,
      },
      required: true,
      where: {
        vkId,
      },
    });
  }

  getByFilter(options = {}) {
    return this.UserModel.findAll({
      include: {
        model: this.RoleModel,
      },
      required: true,
      where: {
        ...options,
      },
    });
  }

  findById(id) {
    return this.UserModel.findOne({
      include: {
        model: this.RoleModel,
      },
      required: true,
      where: {
        id,
      },
    });
  }

  getUserByActivationLink(activatedLink) {
    return this.UserModel.findOne({
      raw: true,
      where: {
        activatedLink,
      },
    });
  }

  getStudyWords({ id, type, wordId }) {
    console.log(id, type, wordId);
    let through = {
      attributes: ["type", "days", "lastRepeatDate", "isFinish"],
      as: "progress",
    };
    let includeWhere = {};
    if (type) {
      through = { ...through, where: { type } };
    }
    if (wordId) {
      includeWhere = { id: wordId };
    }
    return this.UserModel.findOne({
      attributes: [],
      where: { id },
      include: [
        {
          where: includeWhere,
          order: ["id", "ASC"],
          model: this.WordsModel,
          as: "words",
          attributes: ["id", "wordId"],
          through: through,
        },
      ],
    });
  }
}
