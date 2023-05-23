import React, { useEffect, useState } from "react";
import BundleSubmissionView from "../BundleSubmissionComponent";
import { 
  setBundleSelectedForms,
} from "../../../../actions/bundleActions";
import { getFormProcesses } from "../../../../apiManager/services/processServices";
import { executeRule } from "../../../../apiManager/services/bundleServices";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Errors } from "react-formio/lib/components";
import Loading from "../../../../containers/Loading";
import DownloadPdfButton from "../../../Form/ExportAsPdf/downloadPdfButton";

const BundleView = ({ bundleIdProp , showPrintButton = false}) => {
  const { bundleId } = useParams();
  const dispatch = useDispatch();
  const bundleData = useSelector((state) => state.process.formProcessList);
  const selectedForms = useSelector((state) => state.bundle.selectedForms || []);
  const bundleSubmission = useSelector(
    (state) => state.bundle.bundleSubmission
  );
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getFormProcesses(bundleIdProp || bundleId, (err, data) => {
        if (err) {
          setErrors(err); 
          setLoading(false);
        } else {
          executeRule(bundleSubmission || {}, data.id)
            .then((res) => {
              dispatch(setBundleSelectedForms(res.data));
            })
            .catch((err) => {
              setErrors(err); 
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
    );
    return () => {
      dispatch(setBundleSelectedForms([]));
    };
  }, [bundleId, dispatch, bundleIdProp]);
 
  if (loading) {
    return (
      <div data-testid="loading-view-component">
        <Loading />
      </div>
    );
  }

  if(errors) { 
    return (
      <div className="p-3">
        <Errors errors={errors} /> 
      </div>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="task-head px-2 py-2 text-truncate">{bundleData.formName}</h3>
        {showPrintButton && <div className="btn-right d-flex flex-row px-4"><DownloadPdfButton /></div>}
      </div>
      <hr />

      <div>
        {selectedForms.length ? <BundleSubmissionView readOnly={true} /> : ""}
      </div>
    </>
  );
};

export default BundleView;
