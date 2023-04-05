/* istanbul ignore file */
import { httpGETRequest} from "../httpRequestHandler";
import {
  setUserList,
} from "../../actions/userListActions";
import API from "../endpoints/index";

export const fetchUsers = () => {
  return (dispatch) => {
    httpGETRequest(API.USER_LIST)
      .then((res) => {
        if (res.data) {
          dispatch(setUserList(res.data[0]?.roles));
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        if (error?.response?.data) {
          console.log("error",error?.response?.data);
        } else {
          console.log("error");
        }
      });
  };
};

// export const fetchGroups = () => {
//   return (dispatch) => {
//     httpGETRequest(API.GET_GROUPS)
//       .then((res) => {
//         if (res.data) {
//           dispatch(setGroups(res.data));
//         } else {
//           dispatch(dashboardErrorHandler("No groups found"));
//         }
//       })
//       .catch((error) => {
//         if (error?.response?.data) {
//           dispatch(dashboardErrorHandler(error.response.data));
//         } else {
//           dispatch(dashboardErrorHandler("Failed to fetch groups"));
//         }
//       });
//   };
// };

// export const updateAuthorization = (data) => {
//   return (dispatch) => {
//     httpPOSTRequest(API.DASHBOARD_AUTHORIZATION, data)
//       .then((res) => {
//         if (res.data) {
//           dispatch(fetchAuthorizations());
//         } else {
//           dispatch(updateErrorHandler("Update Failed!"));
//         }
//       })
//       .catch((error) => {
//         dispatch(updateErrorHandler(error.message));
//       });
//   };
// };

// export const fetchAuthorizations = () => {
//   return (dispatch) => {
//     httpGETRequest(API.DASHBOARD_AUTHORIZATION)
//       .then((res) => {
//         if (res.data) {
//           dispatch(setDashboardAuthorizations(res.data));
//         } else {
//           dispatch(dashboardErrorHandler("No dashboard authorizations found."));
//         }
//       })
//       .catch((error) => {
//         if (error?.response?.data) {
//           dispatch(dashboardErrorHandler(error.response.data));
//         } else {
//           dispatch(dashboardErrorHandler("Network error."));
//         }
//       });
//   };
// };
