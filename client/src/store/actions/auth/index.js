import { actionTypes } from "../../../common/enum";

function setIsAuth(isAuth) {
  return {
    payload: isAuth,
    type: actionTypes.SET_IS_AUTH,
  };
}

export { setIsAuth };
