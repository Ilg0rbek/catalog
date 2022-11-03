import { actionTypes } from "../../../common/enum";

const setSettingsProperties = (properties) => {
  return {
    payload: { properties },
    type: actionTypes.SET_SETTINGS_PROPERTIES,
  };
};

const setSettingsProperty = ({ key, value, description }) => {
  return {
    payload: { key, value, description },
    type: actionTypes.SET_SETTINGS_PROPERTY,
  };
};

const fetchSettings = () => {
  return {
    type: actionTypes.FETCH_ALL_SETTINGS_PROPERTIES,
  };
};

export { setSettingsProperties, setSettingsProperty, fetchSettings };
