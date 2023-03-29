import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
//import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SaveNext from "./SaveNext";
//import { copyText } from "../../../apiManager/services/formatterService";

const Preview = React.memo(
  ({
    handleNext,
    handleBack,
    activeStep,
    steps,
    processData,
    setProcessData,
    workflow,
    formData,
    submitData,
  }) => {
    const { t } = useTranslation();
    //const [copied, setCopied] = useState(false);
    // const processListData = useSelector(
    //   (state) => state.process.formProcessList
    // );
    //  taking the url and make the copy button

    // const copyPublicUrl = () => {
    //   const originUrl = window.origin;
    //   const url = `${originUrl}/public/form/${formData.form.path}`;

    //   copyText(url).then(() => {
    //     setCopied(() => {
    //       setTimeout(() => {
    //         setCopied(false);
    //       }, 3000);
    //       return true;
    //     });
    //   }).catch((err) => {
    //     console.error(err);
    //   });

    // };
    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    const isLoggedIn = false;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
          spacing={3}
        >
          <Grid item xs={12} sm={1} spacing={3}></Grid>
          <Grid item xs={12} sm={8} spacing={3} />
          <Grid item xs={12} sm={3} className="next-btn">
            <SaveNext
              handleBack={handleBack}
              handleNext={handleNext}
              activeStep={activeStep}
              steps={steps}
              submitData={submitData}
              isLastStep={true}
            />
          </Grid>
          <Grid item xs={12} sm={8} spacing={3} disabled={false}>
            <Card variant="outlined">
              <CardContent>
                <form noValidate autoComplete="off">
                  <div>
                    <span className="font-weight-bold">Overview</span>
                    <hr />
                  </div>
                  <div>
                    <span className="font-weight-bolder">
                      {t("Form Name")} :{" "}
                    </span>
                    <span>
                      {formData && formData.form && formData.form.title
                        ? formData.form.title
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span>Total Number of Forms:</span>
                  </div>
                  <div>
                    <span className="font-weight-bolder">
                      {t("Workflow Name")} :{" "}
                    </span>
                    <span>
                      {workflow && workflow.label ? workflow.label : "-"}
                    </span>
                  </div>
                  {/* {processListData.anonymous && (
                    <div>
                      <span className="fontsize-16">
                        {t("Copy anonymous form URL")}
                      </span>
                      <div
                        data-toggle="tooltip"
                        data-placement="top"
                        title={
                          copied ?
                            (t("URL copied"))
                            :
                            (t("Click Here to Copy"))
                        }
                        className={`coursor-pointer btn ${copied ? "text-success" : "text-primary"
                          }`}
                        onClick={() => {
                          copyPublicUrl();
                        }}
                      >
                        <i
                          className={`${copied ? "fa fa-check" : "fa fa-copy"}`}
                        />
                      </div>
                    </div>
                  )} */}
                  <div className="mt-2">
                    <span className="font-weight-bold">
                      Designer Permission
                      <i className="ml-1 fa fa-info-circle cursor-pointer" />
                    </span>
                    <hr />
                    <div>
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="option1"
                          checked={selectedOption === "option1"}
                          onChange={handleOptionChange}
                        />
                        Accessible for all Designers
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="option2"
                          checked={selectedOption === "option2"}
                          onChange={handleOptionChange}
                        />
                        Private(Only You)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="option3"
                          checked={selectedOption === "option3"}
                          onChange={handleOptionChange}
                        />
                        Specific Designers/Group
                      </label>
                    </div>
                    {isLoggedIn ? (
                      <div className="form-group d-flex">
                        <div className="mr-2">
                          <label>Group</label>
                          <div>
                            <i className="fa fa-users mr-3 p-2 border" />
                          </div>
                        </div>
                        <div>
                          <label>Identifier</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Role Id"
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="font-weight-bold">Client Permission</span>
                    <hr />
                    <div>
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="option1"
                          checked={selectedOption === "option1"}
                          onChange={handleOptionChange}
                        />
                        All Clients
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="option2"
                          checked={selectedOption === "option2"}
                          onChange={handleOptionChange}
                        />
                        Specific Users/Group
                      </label>
                    </div>
                    {isLoggedIn ? (
                      <div className="form-group d-flex">
                        <div className="mr-2">
                          <label>Group</label>
                          <div>
                            <i className="fa fa-users mr-3 p-2 border" />
                          </div>
                        </div>
                        <div>
                          <label>Identifier</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Role Id"
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr />
                  <div>
                    <label>
                      <FormControlLabel
                        control={
                          <Checkbox
                            aria-label="Publish"
                            checked={processData.status === "active"}
                            onChange={(e) =>
                              setProcessData({
                                status: e.target.checked
                                  ? "active"
                                  : "inactive",
                              })
                            }
                            name="Check box to associate form with a workflow"
                            color="primary"
                          />
                        }
                      />
                      <label className="fontsize-16">
                        {t("Publish this form for Client Users.")}
                      </label>
                    </label>
                  </div>
                  <label className="text-label">{t("Comments")}</label>
                  <TextField
                    label={t("Comments")}
                    id="comments"
                    multiline
                    rows={4}
                    variant="outlined"
                    className="text-field"
                    value={processData.comments || ""}
                    onChange={(e) =>
                      setProcessData({
                        comments: e.target.value,
                      })
                    }
                  />
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
);
export default Preview;
