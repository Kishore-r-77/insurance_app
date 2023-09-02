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
import ReportIcon from "@mui/icons-material/Summarize";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, FormControl, Menu, MenuItem, TextField } from "@mui/material";
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
import P0035 from "../paramDataPages/P0035/p0035";
import P0003 from "../paramDataPages/P0003/p0003";
import P0030 from "../paramDataPages/P0030/p0030";
import P0033 from "../paramDataPages/P0033/p0033";
import P0040 from "../paramDataPages/P0040/p0040";
import Q0006 from "../paramDataPages/Q0006/q0006";
import P0027 from "../paramDataPages/P0027/p0027";
import P0029 from "../paramDataPages/P0029/p0029";
import P0031 from "../paramDataPages/P0031/p0031";
import P0032 from "../paramDataPages/P0032/p0032";
import P0034 from "../paramDataPages/P0034/p0034";
import Q0010 from "../paramDataPages/Q0010/q0010";
import Q0012 from "../paramDataPages/Q0012/q0012";
import Q0013 from "../paramDataPages/Q0013/q0013";
import Q0014 from "../paramDataPages/Q0014/q0014";
import Q0015 from "../paramDataPages/Q0015/q0015";
import Q0016 from "../paramDataPages/Q0016/q0016";
import Q0017 from "../paramDataPages/Q0017/q0017";
import Q0018 from "../paramDataPages/Q0018/q0018";
import Q0019 from "../paramDataPages/Q0019/q0019";
import Q0020 from "../paramDataPages/Q0020/q0020";
import Q0021 from "../paramDataPages/Q0021/q0021";
import Q0022 from "../paramDataPages/Q0022/q0022";
import Q0023 from "../paramDataPages/Q0023/q0023";
import Q0024 from "../paramDataPages/Q0024/q0024";
import P0049 from "../paramDataPages/P0049/p0049";
import Q0032 from "../paramDataPages/Q0032/q0032";
import Q0029 from "../paramDataPages/Q0029/q0029";
import P0050 from "../paramDataPages/P0050/p0050";
import P0028 from "../paramDataPages/P0028/p0028";
import P0044 from "../paramDataPages/P0044/p0044";
import Q0036 from "../paramDataPages/Q0036/q0036";
import Q0043 from "../paramDataPages/Q0043/q0043";
import P0036 from "../paramDataPages/P0036/p0036";
import P0041 from "../paramDataPages/P0041/p0041";
import P0043 from "../paramDataPages/P0043/p0043";
import Q0025 from "../paramDataPages/Q0025/q0025";
import P0053 from "../paramDataPages/P0053/p0053";
import P0054 from "../paramDataPages/P0054/p0054";
import P0055 from "../paramDataPages/P0055/p0055";
import CustomHeaderTable from "../../../utilities/Table/customHeaderTable";
import P0056 from "../paramDataPages/P0056/p0056";
import P0057 from "../paramDataPages/P0057/p0057";
import P0058 from "../paramDataPages/P0058/p0058";
import ParamDataUploadModal from "./ParamDataUploadModal";
import Notification from "../../../utilities/Notification/Notification";
import P0059 from "../paramDataPages/P0059/p0059";

const ParamData = () => {
  const {
    sendRequest: sendGetDataRequest,
    status: getDataResponseStatus,
    data: getDataResponse,
    error: getDataResponseError,
  } = useHttp(getData, true);

  const {
    sendRequest: sendReportGetRequest,
    status: reportGetStatus,
    data: getReportResponse,
    error: reportGetError,
  } = useHttp(getData, true);

  const {
    sendRequest: sendModDataRequest,
    status: modDataResponseStatus,
    data: modDataResponse,
    error: modDataResponseError,
    resetStatus: resetModDataRequestStatus,
  } = useHttp(modData, false);
  const [searchparams] = useSearchParams();
  const [pagination, setPagination] = useState({
    pageNum: Number(searchparams.get("seqno")) + 1,
    fetchData: true,
  });
  const [mode, setMode] = useState("display");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const extraDataRef: any = useRef();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const reportMenuopen = Boolean(anchorEl);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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

  const getReport = async (type: any) => {
    let getDataParams: any = {};
    getDataParams.companyId = searchparams.get("companyId");
    getDataParams.name = searchparams.get("name");
    getDataParams.languageId = searchparams.get("languageId");
    getDataParams.item = searchparams.get("item");
    getDataParams.seqno = pagination.pageNum - 1;
    getDataParams.reportType = type;

    sendReportGetRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
      isBlob: true,
    });
  };

  const handleReportMenuPop = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReportMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (reportGetStatus === "completed" && !reportGetError) {
      const url = window.URL.createObjectURL(
        new Blob([getReportResponse.data])
      );
      const link = document.createElement("a");
      link.href = url;
      const filename =
        getReportResponse.headers["content-disposition"].split("filename=")[1];
      link.setAttribute("download", filename);
      link.click();
    }
  }, [reportGetStatus, reportGetError]);

  const handleUploadModal = (params: any) => {

    if (params.operation ==='cancel')
    {
      setUploadModalOpen(false);
    }

    if (params.operation ==='success')
    {
      setUploadModalOpen(false);
      setNotify({
        isOpen: true,
        message: `Data Uploaded Successfully`,
        type: "success",
      });

      refreshData();

    }
   
  }

  const refreshData = () => {

    setPagination((prevState) => ({
      ...prevState,      
      fetchData: true,
    }));

  }

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
      case "1-P0035":
        return (
          <P0035
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );

      case "1-P0003":
        return (
          <P0003
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );

      case "1-P0030":
        return (
          <P0030
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );

      case "1-P0033":
        return (
          <P0033
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );

      case "1-Q0006":
        return (
          <Q0006
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0027":
        return (
          <P0027
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0028":
        return (
          <P0028
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0029":
        return (
          <P0029
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0031":
        return (
          <P0031
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0032":
        return (
          <P0032
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0034":
        return (
          <P0034
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );

      case "1-P0036":
        return (
          <P0036
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0040":
        return (
          <P0040
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0041":
        return (
          <P0041
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0044":
        return (
          <P0044
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0049":
        return (
          <P0049
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0050":
        return (
          <P0050
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0053":
        return (
          <P0053
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0054":
        return (
          <P0054
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );

      case "1-P0055":
        return (
          <P0055
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0056":
        return (
          <P0056
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0057":
        return (
          <P0057
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0058":
        return (
          <P0058
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0059":
        return (
          <P0059
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0010":
        return (
          <Q0010
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0012":
        return (
          <Q0012
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0013":
        return (
          <Q0013
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0014":
        return (
          <Q0014
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0015":
        return (
          <Q0015
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0016":
        return (
          <Q0016
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0017":
        return (
          <Q0017
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0018":
        return (
          <Q0018
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0019":
        return (
          <Q0019
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0020":
        return (
          <Q0020
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0021":
        return (
          <Q0021
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0022":
        return (
          <Q0022
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0023":
        return (
          <Q0023
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0024":
        return (
          <Q0024
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0025":
        return (
          <Q0025
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0029":
        return (
          <Q0029
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0032":
        return (
          <Q0032
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0036":
        return (
          <Q0036
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-Q0043":
        return (
          <Q0043
            ref={extraDataRef}
            data={getDataResponse.param.data}
            mode={mode}
          />
        );
      case "1-P0043":
        return (
          <P0043
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
    <>
    <div>
      <header className={styles.flexStyle}>
        <h1>Business Rules Item Data</h1>
        {mode === "display" &&
          getDataResponseStatus === "completed" &&
          !getDataResponseError && (
            <>
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

              <CustomTooltip text="Report">
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
                  onClick={handleReportMenuPop}
                >
                  <ReportIcon />
                </Button>
              </CustomTooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={reportMenuopen}
                onClose={handleReportMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                elevation={0}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={() => {
                    getReport("excel");
                  }}
                >
                  <span style={{ fontSize: ".8em" }}>Excel Report</span>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    getReport("pdf");
                  }}
                >
                  <span style={{ fontSize: ".8em" }}>Pdf Report</span>
                </MenuItem>
              </Menu>

              <CustomTooltip text="Upload">
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
                    setUploadModalOpen(true)
                  }}
                >
                  <FileUploadIcon />
                </Button>
              </CustomTooltip>
            </>
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
      <CustomHeaderTable
        data={
          new Array(
            "Company: " + searchparams.get("companyId"),
            "Param Name: " + searchparams.get("name"),
            "Param Item: " + searchparams.get("item"),
            "Item Description: " + getDataResponse?.param.longdesc
          )
        }
      />

      {!getDataResponseError &&
        getDataResponseStatus === "completed" &&
        mode !== "pendingcancel" && (
          <>
            {" "}
            <div className={styles.paperStyle}>
              <Grid2
                container
                spacing={2}
                style={{
                  marginTop: ".5em",
                  marginRight: ".5em",
                }}
              >
                {getDataResponse.param.type === "D" && (
                  <Grid2
                    container
                    spacing={2}
                    style={{ width: "95%", margin: "10px auto" }}
                  >
                    <Grid2 xs={8} md={6} lg={3}>
                      <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
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
                      </FormControl>
                    </Grid2>

                    <Grid2 xs={8} md={6} lg={3}>
                      <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
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
                      </FormControl>
                    </Grid2>
                  </Grid2>
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
    <Notification notify={notify} setNotify={setNotify} />
    <ParamDataUploadModal
            show={uploadModalOpen}
            handleModal={handleUploadModal}
        
          />
    </>

  );
};

export default ParamData;
