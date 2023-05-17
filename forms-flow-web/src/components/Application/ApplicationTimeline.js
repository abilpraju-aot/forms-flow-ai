import React from "react";
import { Typography } from "@material-ui/core";
import moment from "moment";
import { MULTITENANCY_ENABLED } from "../../constants/constants";
import { useSelector } from "react-redux";

function ApplicationTimeline({ applicationHistory }) {
  const tenantKey = useSelector((state) => state.tenants?.tenantId);
  const formName = useSelector((state) => state.form.form.title);
  const redirectUrl = MULTITENANCY_ENABLED ? `/tenant/${tenantKey}/` : "/";
  function formatDate(dateString) {
    let dateObj = new Date(dateString);
    return moment(dateObj).format("DD/MM/YYYY");
  }

  function formatTime(dateString) {
    let dateObj = new Date(dateString);
    return moment(dateObj).format("h:mm:ssa");
  }

  const ptag = {
    margin: "0",
  };
  const postiveStatus = ["New", "Submitted", "Completed","Reviewed"];
  const negativeStatus = ["Rejected", "Returned"];

  return (
    <>
      <div className="circle-icon-container ml-2">
        {applicationHistory.map((e, index) => (
          <>
            <div className="circle-icon">
              {postiveStatus.includes(
                e.applicationStatus || e.requestStatus
              ) ? (
                <i className="fa fa-check"></i>
              ) : negativeStatus.includes(
                  e.applicationStatus || e.requestStatus
                ) ? (
                <i className="fa fa-times"></i>
              ) : (
                ""
              )}
            </div>
            {index !== applicationHistory.length - 1 && (
              <div className="line"></div>
            )}
          </>
        ))}
      </div>
      <div className="d-flex flex-column" style={{ marginTop: "2px" }}>
        {applicationHistory.map((e, index) => {
          return (
            <div
              key={index}
              className="ml-5 d-flex align-items-center"
              style={{
                display: "flex",
                gap: "65px",
                marginTop: index !== 0 ? "25px" : "0",
              }}
            >
              <div style={{ width: "120px" }}>
                <Typography className="" style={ptag}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    {formatDate(e.created)}
                  </span>
                  <br></br>
                  {formatTime(e.created)}
                </Typography>
              </div>
              <div style={{ flex: 1 , paddingBottom: "20px"}}>
                <Typography style={ptag}>
                  <span style={{ fontWeight: "bold", marginRight: "1.5em" }}>
                    {e.applicationStatus || e.requestStatus}
                  </span>{" "}
                  {formName}{" "}
                  <span style={{ fontWeight: "bold", marginRight: "1.5em" }}>
                    {e.submittedBy}
                  </span>
                </Typography>
              </div>
              <div style={{ width: "150px", textAlign: "right" , paddingBottom: "20px"  }}>
                <a
                  href={`${redirectUrl}bundle/${e.formId}/submission/${e.submissionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" , fontSize: "12px" }}
                >
                  View Submission <i className="fa fa-pencil-square-o mr-1"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ApplicationTimeline;
