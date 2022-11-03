import { endpointEnum } from "../../common/enum";
import { $api_user } from "../../helpers";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default class AuthService {
  static async login({ email, password }) {
    return $api_user.post(endpointEnum.LOGIN, { email, password });
  }

  static async registration({ email, password, referer }) {
    return $api_user.post(endpointEnum.REGISTRATION, { email, password, referer });
  }

  static async vk({ vkId, referer }) {
    return $api_user.post(endpointEnum.VK, { vkId, referer });
  }

  static async oauthVk({ code, referer }) {
    return $api_user.post(endpointEnum.VKOAUTH, { code, referer });
  }

  static async google({ email, referer }) {
    return $api_user.post(endpointEnum.GOOGLE, { email, referer });
  }


  static async logout() {
    return $api_user.post(endpointEnum.LOGOUT);
  }
  static checkAuth() {
    //to avoid duplication of logic, use pure intance axios
    return axios.get(
      `${process.env.REACT_APP_API_URL_USERS}${endpointEnum.REFRESH_TOKEN}`,
      {
        withCredentials: true,
      }
    );
  }
  static checkResetPasswordEmail({ email }) {
    return $api_user.post(endpointEnum.CHECK_RESET_USER_MAIL, { email });
  }
  static updatePassword({ password, userId, token }) {
    return $api_user.post(endpointEnum.UPDATE_PASSWORD, {
      password,
      userId,
      token,
    });
  }
}
