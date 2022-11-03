import { localStorageConstants } from "../../common/constants/local_storage.constants";

export  class TokenHelper {
  static saveToken(token) {
    localStorage.setItem(localStorageConstants.ACCESS_TOKEN, token);
  }
  static getToken() {
    localStorage.getItem(localStorageConstants.ACCESS_TOKEN);
  }
  static removeToken() {
    localStorage.removeItem(localStorageConstants.ACCESS_TOKEN);
  }
  static checkOnExists() {
    return !!localStorage.getItem(localStorageConstants.ACCESS_TOKEN);
  }
}
