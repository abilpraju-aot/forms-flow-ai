import ACTION_CONSTANTS from "../actions/actionConstants";

// reducers.js
export const initialState = {
    roles: [],
    userError: null,
  };
  
const userAuthorization = (state = initialState, action) => {
    switch (action.type) {
      case  ACTION_CONSTANTS.SET_USER_LIST:
        return {
          ...state,
          roles: action.payload
        };
      default:
        return state;
    }
  };
export default userAuthorization;

