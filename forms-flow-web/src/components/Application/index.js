import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApplicationList from "./List";
import ViewApplication from "./ViewApplication";
import "./Application.scss";
import { setCurrentPage } from "../../actions/bpmActions";
import NotFound from "../NotFound";

export default React.memo(() => {
  const showApplications = useSelector((state) => state.user.showApplications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage("application"));
  }, [dispatch]);

  return (
    <div className="" id="main">
      <Routes>
        {showApplications ? (
          <>
            <Route
              path=""
              element={<ApplicationList/>}
            />
            <Route path={`/:applicationId`} element={<ViewApplication />}/>
            <Route
              path={`/:applicationId/:notavailable`}
              element={<NotFound />}
            />
          </>
        ) : null}
      </Routes>
    </div>
  );
});
