import Cookies from "js-cookie";

export class CookieHelper {
  static setCookie({ name, value, expires = 30 }) {
    Cookies.set(name, value, { expires, path: "" });
  }
  static getCookie(name) {
      return Cookies.get(name)
  }
  static isExists(name){
      return !!Cookies.get(name)
  }
  static clean(name){
    return Cookies.remove(name)
  }
}
