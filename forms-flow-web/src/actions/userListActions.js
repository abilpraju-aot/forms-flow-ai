import ACTION_CONSTANTS from "./actionConstants";

export const setUserList = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.SET_USER_LIST,
    payload: data,
  });
};