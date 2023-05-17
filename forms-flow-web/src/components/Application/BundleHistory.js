import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import ApplicationTimeline from "./ApplicationTimeline";
import RequestStatus from "./RequestStatus";
import { fetchApplicationAuditHistoryList } from "../../apiManager/services/applicationAuditServices";
import { useDispatch, useSelector } from "react-redux";

const BundleHistory = ({ applicationId }) => {
  const dispatch = useDispatch();
  const applicationHistory = useSelector((state) => state.bpmTasks.appHistory);
  const requests = useSelector((state) => state.bpmTasks?.request);
  useEffect(() => {
    dispatch(fetchApplicationAuditHistoryList(applicationId));
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="history-panel">
      <div
        style={{ height: "13rem", gap: "20px" }}
        className="border-right d-flex flex-column"
      >
        <div className="d-flex flex-column">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            borderColor="primary"
            onChange={handleChange}
            indicatorColor="primary"
          >
            <Tab
              label="Application Status"
              value={0}
              style={{ textTransform: "capitalize" }}
            />
            <Tab
              label="Request Status"
              value={1}
              disabled={!requests.length}
              style={{ textTransform: "capitalize" }}
            />
          </Tabs>
        </div>
      </div>
      {activeTab == 0 ? (
        <ApplicationTimeline applicationHistory={applicationHistory} />
      ) : requests.length ? (
        <RequestStatus requests={requests} />
      ) : (
        ""
      )}
    </div>
  );
};

export default BundleHistory;
