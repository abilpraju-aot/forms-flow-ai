import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import ApplicationTimeline from "./ApplicationTimeline";

function RequestStatus({ requests }) {
  const [requestItems, setRequestItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);


  const arrow = {
    paddingInline: "120px",
  };
  const Statusbutton = {
    padding: "0px",
    marginTop: "14px",
    backgroundColor: "#585858",
    color: "white",
    borderRadius: "10px",
    paddingInline: "14px",
  };

  const handleRowExpansion = (items, index) => {
    setSelectedRow(index === selectedRow ? null : index);
    setRequestItems(items);
  };
const timeLine = ()=>{
  return(
    <tr>
    <td
      colSpan={6}
      style={{
        padding: "35px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex" }}>
        <ApplicationTimeline applicationHistory={requestItems} />
      </div>
    </td>
  </tr>
  );
};

  return (
    <table className="table table-striped bt-0">
      <thead>
        <tr>
          <th scope="col" style={{ paddingRight: "500px" }}>
            Request Name
          </th>
          <th scope="col" style={{ textAlign: "center" }}>
            Status
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {requests?.map((e, index) => {
          return (
            <>
                        <tr key={index}>
              <th scope="row">{e?.requestType}</th>
              <Button style={Statusbutton}>completed</Button>
              <td style={arrow}>
                <i
                  className={`fa fa-chevron-${
                    selectedRow === index ? "up" : "down"
                  }`}
                  onClick={() => handleRowExpansion(e?.items, index)}
                ></i>
              </td>
            </tr>
            {selectedRow === index && <>{timeLine()}</>}
            </>
          );
        })}

      </tbody>
    </table>
  );
}

export default RequestStatus;
