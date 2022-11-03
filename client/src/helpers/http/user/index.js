import axios from "axios";
import { endpointEnum, actionTypes } from "../../../common/enum";
import { TokenHelper } from "../../../helpers";
import { dispatch } from "../../../store/store";
import dotenv from "dotenv";
dotenv.config();


const $api_user = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL_USERS,
});

$api_user.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api_user.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originRequest = error.config;
    if (error.response.status === 401) {
      if (error.config && !error.config._isRetry) {
        originRequest._isRetry = true;
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL_USERS}${endpointEnum.REFRESH_TOKEN}`,
            {
              withCredentials: true,
            }
          );
          TokenHelper.saveToken(response.data.accessToken);
          return $api_user.request(originRequest);
        } catch (e) {
          //if token expired logout
          console.log("error happened in auth interceptor error 401");
          dispatch({ type: actionTypes.LOGOUT });
        }
      } else {
        //to prevent an endless cycle of token update requests
        console.log("401 error happened twice");
        dispatch({ type: actionTypes.LOGOUT });
      }
    }  

    throw error;
  }
);

export default $api_user;
