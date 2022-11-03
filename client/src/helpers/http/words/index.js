import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const $api_word = axios.create({
  baseURL: process.env.REACT_APP_API_URL_WORDS,
});
$api_word.defaults.params = {};
$api_word.interceptors.request.use(
  (config) => {
    config.params["apiKey"] = process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default $api_word;
