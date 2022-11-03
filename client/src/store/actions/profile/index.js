import { actionTypes } from "../../../common/enum";

const clearUserData = () => {
  return {
    payload: { user: null },
    type: actionTypes.CLEAR_USER_DATA,
  };
};

const setUser = (user) => {
  return {
    payload: { user },
    type: actionTypes.SET_USER,
  };
};

const setUserLoading = (isLoading) => {
  return {
    payload: { isLoading },
    type: actionTypes.SET_USER_LOADING,
  };
};

export { clearUserData, setUser, setUserLoading };
