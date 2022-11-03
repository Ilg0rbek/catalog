import { errorEnum } from "../../common/enums";
import { hashPassword } from "../../helpers/utils";
import { mailHelper } from "../../helpers/mail/mail.helper.js";
import responseEnum from "../../common/enums/response.enum.js";

export class UserService {
  constructor({ AuthRepository, WordsRepository, WordsUsersRepository }) {
    this.AuthRepository = AuthRepository;
    this.WordsRepository = WordsRepository;
    this.WordsUsersRepository = WordsUsersRepository;
  }

  async getAllUsers() {
    const response = await this.AuthRepository.getByFilter();
    const users = response.map(({ dataValues: user }) => {
      return { ...user, role: user.role.role };
    });

    return users;
  }

  async getUserById(id) {
    const { dataValues: response } = await this.AuthRepository.findById(id);
    const user = { ...response, role: response.role.role };
    return user;
  }

  async updateUserById({ id, data }) {
    const prevData = await this.AuthRepository.getById(id);
    if (!prevData) {
      throw new Error(errorEnum.USER_NOT_EXIST);
    }
    if (data?.password) {
      const hashedPassword = hashPassword(data.password);
      data.password = hashedPassword;
    }
    const user = {
      ...prevData,
      ...data,
    };
    await this.AuthRepository.updateById(id, user);
    let { dataValues: newUser } = await this.AuthRepository.findById(id);
    newUser = { ...newUser, role: newUser.role.role };

    return newUser;
  }

  async cashoutRequest({ id, data }) {

    const user = await this.AuthRepository.getById(id);

    if (!user) {
      throw new Error(errorEnum.USER_NOT_EXIST);
    }

    await mailHelper.cashoutRequest(
      data
    );

    return responseEnum.OK;
  }

  async addHistory(body) {

    const { userId, key, value } = body;

    const user = {
      userId,
      key,
      value,
    };


    const response = await this.AuthRepository.addHistory(user);
    const userModel = { ...response.dataValues };

    return { userModel };
  }


  async setUserBanStatusById({ id, isBanned }) {
    return this.updateUserById({ id, data: { isBanned } });
  }

  async setUserBuySubscribeStatusById({ id, subscribe }) {
    return this.updateUserById({ id, data: { subscribe } });
  }

  async approveUserById({ id, isApproved }) {
    return this.updateUserById({ id, data: { isApproved } });
  }
  async addWord({ wordId, userId, type }) {
    const word = await this.WordsRepository.getByIdNoRaw(wordId);
    if (!word) {
      throw new Error(errorEnum.WORD_NOT_EXISTS);
    }
    const user = await this.AuthRepository.getByIdNoRaw(userId);
    if (!user) {
      throw new Error(errorEnum.USER_NOT_EXISTS);
    }
    return user.addWord(word, { through: { type } });
  }

  async checkHistory({ userId, key, value }) {
    const response = await this.AuthRepository.checkHistory(userId, key, value);
    if (!response) throw new Error(errorEnum.INVALID_PROMOCODE);
    else {
      const userModel = { ...response.dataValues };
      return { userModel };
    }
  }


  async deletePromo({ key, value }) {
    const response = await this.AuthRepository.deletePromo(key, value);
    const userModel = { ...response.dataValues };
    return { userModel };

  }

  async getWords({ id, type }) {
    return this.AuthRepository.getStudyWords({ id, type });
  }
  async setUserWordStatus({
    userId,
    wordId,
    type,
    days,
    lastRepeatDate,
    isFinish,
  }) {
    let response = null;
    const wordUser = await this.WordsUsersRepository.findOneByParams({
      userId,
      wordId,
    });
    if (!wordUser) {
      response = await this.WordsUsersRepository.create({
        userId,
        wordId,
        type,
      });
    } else {
      response = await this.WordsUsersRepository.updateByParams(
        { userId, wordId },
        { type, days, lastRepeatDate, isFinish }
      );
    }
    return this.AuthRepository.getStudyWords({ id: userId, type, wordId });
  }
}
