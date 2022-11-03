import { alertTypes } from "../../common/enum";

let id = 0;

const defaultOptions = {
  type: alertTypes.INFO,
};

export default function createToast(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++,
  };
}
