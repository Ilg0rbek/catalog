import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenRepository } from "../../database/repository/index.js";
import { lifetimesConstants } from "../../common/constants/index.js";

dotenv.config();
class TokenHelper {
  generateTokens(payload) {

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY_SALT, {
      expiresIn: lifetimesConstants.ACCESS_TOKEN_LIFE_TIME,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY_SALT, {
      expiresIn: lifetimesConstants.REFRESH_TOKEN_LIFE_TIME,
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  async saveToken(refreshToken, userId) {
    const tokenData = await TokenRepository.findTokenByUserId(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return TokenRepository.updateById(tokenData.id, tokenData);
    }
    return TokenRepository.create({
      userId: userId,
      refreshToken,
    });
  }
  async removeToken(refreshToken) {
    const response = await TokenRepository.deleteByParams({ refreshToken }); //supposed output 1 || 0
    return response;
  }
  
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY_SALT);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY_SALT);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export const tokenHelper = new TokenHelper();
