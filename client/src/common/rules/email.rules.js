import { regexConstants } from "../constants";

export default [
  { required: true, message: "Пожайлуста введите email!" },
  {
    pattern: new RegExp(regexConstants.EMAIL),
    message:
      "Почта должна иметь вид some@gmail.com ",
  },
];
