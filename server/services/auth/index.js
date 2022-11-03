import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { UserDto } from "../../helpers/dtos/user.dto.js";
import { ApiError } from "../../exeptions/api-error.js";
import { mailHelper } from "../../helpers/mail/mail.helper.js";
import { tokenHelper } from "../../helpers/token/token.helper.js";
import errorEnum from "../../common/enums/error.enum.js";
import rolesEnum from "../../common/enums/roles.enum.js";
import { hashPassword } from "../../helpers/utils/index.js";
import { addDays } from "../../helpers/date/index.js";
import responseEnum from "../../common/enums/response.enum.js";
import axios from 'axios'

dotenv.config();

export class AuthService {
  constructor({
    AuthRepository,
    TokenRepository,
    RoleRepository,
    ResetPasswordRepository,
  }) {
    this.AuthRepository = AuthRepository;
    this.TokenRepository = TokenRepository;
    this.RoleRepository = RoleRepository;
    this.ResetPasswordRepository = ResetPasswordRepository;
  }

  async registration(body) {
    const { email, password, referer } = body;
    const candidate = await this.AuthRepository.findByEmail(email);
    if (candidate) {
      throw new Error(errorEnum.USER_WITH_SAME_EMAIL_EXISTS);
    }
    const hashedPassword = hashPassword(password);
    const activatedLink = uuidv4();
    const role = await this.RoleRepository.findOneByParams({
      role: rolesEnum._USER,
    });

    const roleId = role.id;
    const user = {
      email,
      password: hashedPassword,
      referer: referer,
      activatedLink,
      roleId,
      isApproved: false,
      isBanned: false,
    };

    const response = await this.AuthRepository.create(user);
    const userModel = { ...response.dataValues, role: role.role };
    const userDto = new UserDto(userModel); //id email isActivated role
    const { refreshToken, accessToken } = await this._saveTokens(userDto);
    await mailHelper.sendActivationMail(
      email,
      `${process.env.APP_URL}/auth/activate/${activatedLink}`
    );
    return { refreshToken, accessToken, user: userDto };
  }

  async vkAuth(body) {
    const { referer, vkId } = body
    const candidate = await this.AuthRepository.findByVkId(vkId)
    if (!candidate) {
      const role = await this.RoleRepository.findOneByParams({
        role: rolesEnum._USER,
      });
      const roleId = role.id;
      const fakeCredential = `vkid${vkId}@memorialanguage2.ru`
      const user = {
        email: fakeCredential,
        password: fakeCredential,
        referer,
        activated: true,
        vkId,
        roleId,
        isApproved: false,
        isBanned: false,
      };
      const response = await this.AuthRepository.create(user);
      const userModel = { ...response.dataValues, role: role.role };
      const userDto = new UserDto(userModel); //id email isActivated role
      const { refreshToken, accessToken } = await this._saveTokens(userDto);
      return { refreshToken, accessToken, user: userDto };
    } else {
      const { dataValues: user } = candidate;
      const userDto = new UserDto({
        ...user,
        role: user.role.role,
      });
      const { refreshToken, accessToken } = await this._saveTokens(userDto);
      return { refreshToken, accessToken, user: userDto };
    }
  }

  async googleAuth(body) {
    const { referer, email } = body
    const candidate = await this.AuthRepository.findByEmail(email)
    if (!candidate) {
      const role = await this.RoleRepository.findOneByParams({
        role: rolesEnum._USER,
      });
      const roleId = role.id;
      const user = {
        email: email,
        password: email,
        referer,
        activated: true,
        roleId,
        isApproved: false,
        isBanned: false,
      };
      const response = await this.AuthRepository.create(user);
      const userModel = { ...response.dataValues, role: role.role };
      const userDto = new UserDto(userModel); //id email isActivated role
      const { refreshToken, accessToken } = await this._saveTokens(userDto);
      return { refreshToken, accessToken, user: userDto };
    } else {
      const { dataValues: user } = candidate;
      const userDto = new UserDto({
        ...user,
        role: user.role.role,
      });
      const { refreshToken, accessToken } = await this._saveTokens(userDto);
      return { refreshToken, accessToken, user: userDto };
    }
  }

  async logIn({ email, password }) {
    const candidate = await this.AuthRepository.findByEmail(email);

    if (!candidate) {
      throw ApiError.BadRequest(errorEnum.USER_NOT_FOUND);
    }
    const { dataValues: user } = candidate;
    const isEqualPasswords = await bcrypt.compare(password, user.password);
    if (!isEqualPasswords) {
      throw ApiError.BadRequest(errorEnum.INCORRECT_CREDENTIALS);
    }
    const userDto = new UserDto({
      ...user,
      role: user.role.role,
    });
    const { refreshToken, accessToken } = await this._saveTokens(userDto);
    return { refreshToken, accessToken, user: userDto };
  }

  async oauthVk({ code, referer }) {
    const params = {
      'client_id': process.env.VK_ID,
      'client_secret': process.env.VK_SECRET,
      'redirect_uri': `${process.env.CLIENT_URL}/login`,
      code
    }
    const response = await axios(`https://oauth.vk.com/access_token?${decodeURI(new URLSearchParams(params))}`)
    const userVkId = response.data.user_id

    const candidate = await this.AuthRepository.findByVkId(userVkId)
    if (!candidate) {
      const role = await this.RoleRepository.findOneByParams({
        role: rolesEnum._USER,
      });
      const roleId = role.id;
      const fakeCredential = `vkid${userVkId}@memorialanguage2.ru`
      const user = {
        email: fakeCredential,
        password: fakeCredential,
        referer,
        activated: true,
        vkId: userVkId,
        roleId,
        isApproved: false,
        isBanned: false,
      };
      const response = await this.AuthRepository.create(user);
      const userModel = { ...response.dataValues, role: role.role };
      const userDto = new UserDto(userModel); //id email isActivated role
      const { refreshToken, accessToken } = await this._saveTokens(userDto);
      return { refreshToken, accessToken, user: userDto };
    } else {
      const { dataValues: user } = candidate;
      const userDto = new UserDto({
        ...user,
        role: user.role.role,
      });
      const { refreshToken, accessToken } = await this._saveTokens(userDto);
      return { refreshToken, accessToken, user: userDto };
    }
  }

  async logOut({ refreshToken }) {
    return tokenHelper.removeToken(refreshToken);
  }

  async activate(activationLink) {
    const candidate = await this.AuthRepository.getUserByActivationLink(
      activationLink
    );

    if (!candidate) {
      throw ApiError.BadRequest({
        message: errorEnum.INCORRECT_ACTIVATION_LINK,
      });
    }
    const user = { ...candidate, activated: true };
    const response = await this.AuthRepository.updateById(user.id, user);

    if (!response) {
      throw ApiError({ message: errorEnum.SOMETHING_WENT_WRONG });
    }

    return responseEnum.OK;
  }

  async reset({ userId, token, password }) {
    const candidate = await this.ResetPasswordRepository.findOneByParams({
      userId,
      resetPasswordToken: token,
    });
    if (!candidate) {
      throw ApiError.BadRequest(errorEnum.INCORRECT_ACTIVATION_LINK);
    }
    if (candidate.expire < new Date()) {
      throw ApiError.BadRequest(errorEnum.TOKEN_EXPIRE);
    }
    const hashedPassword = hashPassword(password);

    await this.AuthRepository.updateById(userId, {
      password: hashedPassword,
    });

    return responseEnum.OK;
  }
  async refresh({ refreshToken }) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenHelper.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.TokenRepository.findOneByParams({
      refreshToken,
    });
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const response = await this.AuthRepository.findById(userData.id);
    if (!response) {
      throw ApiError.UnauthorizedError();
    }
    const { dataValues: userModel } = response;

    const userDto = new UserDto({
      ...userModel,
      role: userModel.role.role,
    });

    const { accessToken } = tokenHelper.generateTokens({
      ...userDto,
    });
    return { accessToken, user: userDto };
  }

  async sendPayLink({ email, amount }) {
    const candidate = await this.AuthRepository.findOneByParams({
      email,
    });

    if (!candidate) {
      throw ApiError.BadRequest(errorEnum.USER_NOT_FOUND);
    }

    const yoomoneyLink = process.env.PAY_LINK.replace('1000', amount);
    await mailHelper.sendYoomoneylink(email, `${yoomoneyLink}/${candidate.id}`);

    return responseEnum.OK;
  }

  async resetPassword({ email }) {
    const candidate = await this.AuthRepository.findOneByParams({
      email,
    });
    if (!candidate) {
      throw ApiError.BadRequest(errorEnum.USER_NOT_FOUND);
    }

    await this.ResetPasswordRepository.deleteByUserId(candidate.id);

    const token = uuidv4();

    await this.ResetPasswordRepository.create({
      userId: candidate.id,
      resetPasswordToken: token,
      expire: addDays(1),
    });

    await mailHelper.sendActivationMail(
      email,
      `${process.env.CLIENT_URL}/login/reset/${candidate.id}/${token}`
    );
    return responseEnum.OK;
  }

  async _saveTokens(userData) {
    const { refreshToken, accessToken } = tokenHelper.generateTokens({
      ...userData,
    });
    await tokenHelper.saveToken(refreshToken, userData.id);

    return { refreshToken, accessToken };
  }
}
