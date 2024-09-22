import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

// import List from './List'
import Item from "./Item/index";
import { BASE_ROUTE } from "../../../../constants/constants";
import  userRoles  from "../../../../constants/permissions";

const Form = React.memo(() => {
  const { viewSubmissions } = userRoles();
 

  return (
    <div>
      <Routes>
        <Route exact path={`${BASE_ROUTE}form/:formId/submission`}>
          <Navigate exact to="/404" />
        </Route>
        {viewSubmissions && (
          <Route
            path={`${BASE_ROUTE}form/:formId/submission/:submissionId`}
            component={Item}
          />
        )}
      </Routes>
    </div>
  );
});

export default Form;
