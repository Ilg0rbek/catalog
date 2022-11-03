import { actionTypes } from "../../../common/enum";

const setUsers = (users) => {
  return {
    payload: { users },
    type: actionTypes.SET_USERS,
  };
};

const updateUser = (user) => {
  return {
    payload: { user },
    type: actionTypes.UPDATE_USER,
  };
};

export { setUsers, updateUser };
