import React, { useEffect, useRef, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getData, modData } from "../../../services/http-service";
import Test from "../paramDataPages/test/test";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import styles from "./paramdata.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
import JsonView from "../paramDataPages/jsonView/jsonView";
import CustomTooltip from "../../../utilities/cutomToolTip/customTooltip";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Alert, Button as Button1, Image, Spinner } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import Q0011 from "../paramDataPages/Q0011/q0011";
import Q0005 from "../paramDataPages/Q0005/q0005";
const ParamData = () => {
  const {
    sendRequest: sendGetDataRequest,
    status: getDataResponseStatus,
    data: getDataResponse,
    error: getDataResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendModDataRequest,
    status: modDataResponseStatus,
    data: modDataResponse,
    error: modDataResponseError,
    resetStatus: resetModDataRequestStatus,
  } = useHttp(modData, false);
  const [searchparams] = useSearchParams();
  const [pagination, setPagination] = useState({ pageNum: 1, fetchData: true });
  const [mode, setMode] = useState("display");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const extraDataRef: any = useRef();

  useEffect(() => {
    if (pagination.fetchData) {
      let getDataParams: any = {};
      getDataParams.companyId = searchparams.get("companyId");
      getDataParams.name = searchparams.get("name");
      getDataParams.languageId = searchparams.get("languageId");
      getDataParams.item = searchparams.get("item");
      getDataParams.seqno = pagination.pageNum - 1;
      sendGetDataRequest({
        apiUrlPathSuffix: "/basicservices/paramItem",
        getDataParams: getDataParams,
      });
    }
  }, [pagination]);

  useEffect(() => {
    if (
      modDataResponseStatus === "completed" &&
      !modDataResponseError &&
      mode !== "display"
    ) {
      if (mode === "delete") {
        setPagination((prevState) => ({
          pageNum: prevState.pageNum - 1,
          fetchData: true,
        }));
        getDataResponse.paginationData.totalRecords--;
      }
      if (mode === "create") {
        getDataResponse.paginationData.totalRecords++;
      }
      setMode("display");
    }
  }, [modDataResponseStatus, modDataResponseError]);

  useEffect(() => {
    if (
      getDataResponseStatus === "completed" &&
      !getDataResponseError &&
      getDataResponse.param.type === "D"
    ) {
      const startDate = new Date(
        getDataResponse.param.startDate.substring(0, 4) +
          "-" +
          getDataResponse.param.startDate.substring(4, 6) +
          "-" +
          getDataResponse.param.startDate.substring(6, 8)
      );
      const endDate = new Date(
        getDataResponse.param.endDate.substring(0, 4) +
          "-" +
          getDataResponse.param.endDate.substring(4, 6) +
          "-" +
          getDataResponse.param.endDate.substring(6, 8)
      );
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [getDataResponseStatus, getDataResponseError]);

  const navigateToLink = (params: any) => {
    navigate({
      pathname: params.link,
      search: createSearchParams(params.searchParams).toString(),
    });
  };

  const nexPage = () => {
    if (pagination.pageNum < totalRecords) {
      setPagination((prevState) => ({
        ...prevState,
        pageNum: prevState.pageNum + 1,
        fetchData: true,
      }));
      if (mode !== "display") {
        setMode("display");
      }
      resetModDataRequestStatus();
    }
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pagination.pageNum > 1) {
      setPagination((prevState) => ({
        ...prevState,
        pageNum: prevState.pageNum - 1,
        fetchData: true,
      }));
      if (mode !== "display") {
        setMode("display");
      }
      resetModDataRequestStatus();
    } else return;
  };

  //pagination variables calculation
  const totalRecfromBackend =
    !getDataResponseError &&
    getDataResponseStatus === "completed" &&
    getDataResponse &&
    getDataResponse.paginationData
      ? getDataResponse.paginationData.totalRecords
      : 0;
  const totalRecords =
    mode === "create" ? totalRecfromBackend + 1 : totalRecfromBackend;
  const isLast = pagination.pageNum === totalRecords;

  //end pagination variable calculation

  const handleSubmit = () => {
    if (mode === "create" || mode === "update") {
      let extradata = extraDataRef.current.getData();

      let requestBody: any = {
        companyId: Number(searchparams.get("companyId")),
        name: searchparams.get("name"),
        item: searchparams.get("item"),
        data: extradata,
        seqno: pagination.pageNum - 1,
        languageId: Number(searchparams.get("languageId")),
      };

      if (getDataResponse.param.type === "D") {
        let startD = new Date(startDate);
        let strmonth = "" + (startD.getMonth() + 1);
        let strday = "" + startD.getDate();
        let stryear = startD.getFullYear();

        if (strmonth.length < 2) {
          strmonth = "0" + strmonth;
        }
        if (strday.length < 2) {
          strday = "0" + strday;
        }
        requestBody.startDate = stryear + strmonth + strday;
        let endD = new Date(endDate);
        let endmonth = "" + (endD.getMonth() + 1);
        let endday = "" + endD.getDate();
        let endyear = endD.getFullYear();

        if (endmonth.length < 2) {
          endmonth = "0" + endmonth;
        }
        if (endday.length < 2) {
          endday = "0" + endday;
        }
        requestBody.endDate = endyear + endmonth + endday;
      }

      sendModDataRequest({
        apiUrlPathSuffix: "/basicservices/paramItem",
        requestBody: requestBody,
        mode: mode,
      });
    }

    if (mode === "delete") {
      sendModDataRequest({
        apiUrlPathSuffix: "/basicservices/paramItem",
        getDataParams: {
          companyId: Number(searchparams.get("companyId")),
          name: searchparams.get("name"),
          item: searchparams.get("item"),
          languageId: Number(searchparams.get("languageId")),
          seqno: pagination.pageNum - 1,
        },
        mode: mode,
      });
    }
  };

  const getExtraDataComponent = (paramName: string) => {
    switch (paramName) {
      case "1-Test":
        return (
          <Test
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
        case "1-Q0011":
          return (
            <Q0011
              ref={extraDataRef}
              data={getDataResponse.param.data}
              mode={mode}
            />
          );

          case "1-Q0005":
            return (
              <Q0005
                ref={extraDataRef}
                data={getDataResponse.param.data}
                mode={mode}
              />
            );

      default:
        return (
          <JsonView
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
    }
  };

  return (
    <div>
      <header className={styles.flexStyle}>
        <h1>Param Item Data</h1>
        {mode === "display" &&
          getDataResponseStatus === "completed" &&
          !getDataResponseError && (
            <CustomTooltip text="Edit">
              <Button
                id={styles["add-btn"]}
                style={{
                  marginTop: "1rem",
                  maxWidth: "40px",
                  maxHeight: "40px",
                  minWidth: "40px",
                  minHeight: "40px",
                  backgroundColor: "#0a3161",
                }}
                variant="contained"
                color="primary"
                onClick={() => {
                  resetModDataRequestStatus();
                  setMode("update");
                }}
              >
                <EditIcon />
              </Button>
            </CustomTooltip>
          )}

        {pagination.pageNum === totalRecords &&
          mode == "display" &&
          getDataResponseStatus === "completed" &&
          !getDataResponseError && (
            <>
              <CustomTooltip text="Add">
                <Button
                  id={styles["add-btn"]}
                  style={{
                    marginTop: "1rem",
                    maxWidth: "40px",
                    maxHeight: "40px",
                    minWidth: "40px",
                    minHeight: "40px",
                    backgroundColor: "#0a3161",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    resetModDataRequestStatus();
                    setMode("create");
                    setPagination((prevState) => ({
                      pageNum: prevState.pageNum + 1,
                      fetchData: false,
                    }));
                  }}
                >
                  <AddBoxIcon />
                </Button>
              </CustomTooltip>
              {pagination.pageNum > 1 && (
                <CustomTooltip text="Delete">
                  <Button
                    id={styles["add-btn"]}
                    style={{
                      marginTop: "1rem",
                      maxWidth: "40px",
                      maxHeight: "40px",
                      minWidth: "40px",
                      minHeight: "40px",
                      backgroundColor: "#dc3545",
                    }}
                    variant="contained"
                    onClick={() => {
                      resetModDataRequestStatus();
                      setMode("delete");
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </CustomTooltip>
              )}
            </>
          )}

        <CustomTooltip text="Go Back">
          <Button
            id={styles["add-btn"]}
            style={{
              marginTop: "1rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
              backgroundColor: "#0a3161",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigateToLink({
                link: "/paramItems",
                searchParams: {
                  companyId: searchparams.get("companyId"),
                  name: searchparams.get("name"),
                  languageId: searchparams.get("languageId"),
                },
              });
            }}
          >
            <ArrowBackIcon />
          </Button>
        </CustomTooltip>
      </header>

      {!getDataResponseError &&
        getDataResponseStatus === "completed" &&
        mode !== "pendingcancel" && (
          <>
            {" "}
            <div className={styles.paperStyle}>
              <Grid2 container spacing={2} style = {{marginTop : ".5em" , marginRight : ".5em"}}>
                {getDataResponse.param.type === "D" && (
                  <>
                    <Grid2 xs={12} md={6} lg={4}  sm= {6}  xl={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          readOnly={mode === "display" || mode === "delete"}
                          label="Start Date"
                          inputFormat="DD/MM/YYYY"
                          value={startDate}
                          onChange={(
                            date: React.ChangeEvent<HTMLInputElement> | any
                          ) => setStartDate(date)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid2>

                    <Grid2 xs={12} md={6} lg={4}  sm= {6}  xl={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          readOnly={mode === "display" || mode === "delete"}
                          label="End Date"
                          inputFormat="DD/MM/YYYY"
                          value={endDate}
                          onChange={(
                            date: React.ChangeEvent<HTMLInputElement> | any
                          ) => setEndDate(date)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid2>
                    <Grid2 xs={12} md={6} lg={4}  sm= {6}  xl={4}>


                    </Grid2>
                  </>
                )}

                {getExtraDataComponent(
                  searchparams.get("companyId") + "-" + searchparams.get("name")
                )}
              </Grid2>

              <div style={{ justifyContent: "flex-start", marginTop: "0.5em" }}>
                {(mode === "update" ||
                  mode === "create" ||
                  mode === "delete") && (
                  <>
                    {mode === "update" || mode === "create" ? (
                      <CustomTooltip
                        text={mode === "update" ? "Update" : "Create"}
                      >
                        <Button1
                          type="button"
                          className="btn  btn-primary "
                          disabled={modDataResponseStatus === "pending"}
                          style={{
                            marginRight: "0.5em",
                            width: "3em",
                            height: "2.4em",
                          }}
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          <CheckCircleIcon style={{ marginBottom: "0.5em" }} />
                        </Button1>
                      </CustomTooltip>
                    ) : (
                      <CustomTooltip text="Confirm Delete">
                        <Button1
                          type="button"
                          className="btn  btn-danger "
                          disabled={modDataResponseStatus === "pending"}
                          style={{
                            marginRight: "0.5em",
                            width: "3em",
                            height: "2.4em",
                          }}
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          <DeleteIcon style={{ marginBottom: "0.5em" }} />
                        </Button1>
                      </CustomTooltip>
                    )}

                    <CustomTooltip text="Cancel">
                      <Button1
                        type="button"
                        className="btn  btn-primary "
                        disabled={modDataResponseStatus === "pending"}
                        style={{
                          marginRight: "0.5em",
                          width: "3em",
                          height: "2.4em",
                        }}
                        onClick={() => {
                          if (modDataResponseError) {
                            resetModDataRequestStatus();
                          }
                          if (mode === "create") {
                            setPagination((prevState) => ({
                              pageNum: prevState.pageNum - 1,
                              fetchData: true,
                            }));
                          }

                          setMode("pendingcancel");
                          //this delay in rendering the form will help to restore the old values set as defaultValue in input elements
                          setTimeout(() => {
                            setMode("display");
                          }, 0.1);
                        }}
                      >
                        <CancelIcon style={{ marginBottom: "0.5em" }} />
                      </Button1>
                    </CustomTooltip>
                    <div>
                      {modDataResponseStatus === "pending" && (
                        <Image
                          className="pl-3"
                          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                        />
                      )}
                    </div>

                    {modDataResponseError &&
                      modDataResponseStatus === "completed" && (
                        <Alert variant="danger" className="pl-2">
                          <span>update failed : {modDataResponseError}</span>
                        </Alert>
                      )}
                  </>
                )}
              </div>
            </div>
            {getDataResponse.param.type === "D" && (
              <CustomPagination
                pageNum={pagination.pageNum}
                totalRecords={totalRecords}
                totalPages={totalRecords}
                hidePageSizeChange={true}
                isLast={isLast}
                prevPage={prevPage}
                nexPage={nexPage}
              />
            )}
          </>
        )}
      <div className={styles.paperStyle}>
        {getDataResponseError && getDataResponseStatus === "completed" && (
          <Alert variant="danger">
            <span>{getDataResponseError}</span>
          </Alert>
        )}

        {!modDataResponseError && modDataResponseStatus === "completed" && (
          <Alert variant="success">
            <span>success! {modDataResponse.message}</span>
          </Alert>
        )}

        {getDataResponseStatus === "pending" && (
          <Spinner
            animation="border"
            role="status"
            style={{ marginTop: "7%", marginLeft: "10%" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </div>
  );
};

export default ParamData;
