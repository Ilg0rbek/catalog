import { endpointEnum } from "../../common/enum";
import { $api_user } from "../../helpers";

export default class UsersService {
  static getAllUsers() {
    return $api_user.get(endpointEnum.GET_ALL_USERS);
  }
  static approveUserById({ id, isApproved }) {
    return $api_user.put(`${endpointEnum.APPROVE_USER}/${id}`, { isApproved });
  }
  static banUserById({ id, isBanned }) {
    return $api_user.put(`${endpointEnum.BAN_USER}/${id}`, { isBanned });
  }
  static updateUserById({ id, data }) {
    return $api_user.put(`${endpointEnum.UPDATE_USER}/${id}`, { data });
  }
  static sendCashoutRequest({ id, data }) {
    return $api_user.put(`${endpointEnum.CASHOUT_REQUEST}/${id}`, { data });
  }
  static addHistory({ userId, key, value }) {
    return $api_user.post(`${endpointEnum.ADD_HISTORY}`, { userId, key, value });
  }

  static checkHistory({ userId, key, value }) {
    return $api_user.get(`${endpointEnum.CHECK_HISTORY}/${userId}/${key}/${value}`);
  }

  static deletePromo({ id, key, value }) {
     return $api_user({
      method: "put",
      url: `${endpointEnum.DELETE_PROMO}/${id}`,
      data: { id, key, value },
    });
  }
}
