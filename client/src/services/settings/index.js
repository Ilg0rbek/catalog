import { endpointEnum } from "../../common/enum";
import { $api_user } from "../../helpers";

export class SettingsService {
  static setSettingsProperty({ key, value }) {
    return $api_user({
      method: "put",
      url: endpointEnum.SET_SETTINGS_PROPERTY,
      data: { key, value },
    });
  }
  static getSettingsProperty({ key }) {
    return $api_user.get(`${endpointEnum.GET_SETTINGS_PROPERTY}/${key}`);
  }
  static getAllSettingsProperty() {
    return $api_user.get(`${endpointEnum.GET_ALL_SETTINGS_PROPERTY}`);
  }
}
