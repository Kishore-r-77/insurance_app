import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomPartSurrender from "./CustomPartSurrender";
import styles from "./partSurrender.module.css";
import { getBusinessDateApi } from "../surrenderModal/surrenderApi";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useBusinessDate } from "../../contexts/BusinessDateContext";
import {
  paramItem,
  postIlpPartSurrender,
  saveIlpPartSurrender,
} from "./partSurrenderApi";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import CustomModal from "../../../utilities/modal/CustomModal";
import { ACTIONS } from "../../../reducerUtilities/actions/IlpPartSurrender/IlpPartSurrenderAction";

function PartSurrender({
  getData,
  ilppartsurrenderState,
  ilppartsurrenderDispatch,
  polid,
  policyRecord,
}: any) {
  const title: string = "ILP Part Surrender";
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  polid = policyRecord?.ID;

  const isSave = useRef(false);
  const isChecked = useRef(false);

  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  const [ilpPartBenefits, setilpPartBenefits] = useState<any>([]);
  const [exfunds, setexfunds] = useState<any>([]);

  useEffect(() => {
    return () => {};
  }, [ilppartsurrenderState.ilppartsurrenderOpen === false]);

  const getbenefitsbypol = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/benefitgetbypol/${polid}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setilpPartBenefits(resp.data?.Benefit);
      });
  };

  const getfundsbybenefitandpol = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/ilpsummarybypolandben/${polid}/${benId}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setexfunds(resp.data["IlpSummary"]);
      });
  };
  const handleChangeFund = (e: any, i: number) => {
    const { name, value } = e.target;

    setexfunds(
      exfunds.map((fundDetails: any, index: number) => {
        if (index === i) {
          return { ...fundDetails, [name]: value };
        } else return fundDetails;
      })
    );
  };
  const userId = useAppSelector((state) => state.users.user.message.id);
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [causeOfSurrenderData, setcauseOfSurrenderData] = useState([]);
  const causeOfSurrenderMenu = () => {
    return paramItem(companyId, "P0047", languageId)
      .then((resp) => {
        setcauseOfSurrenderData(resp.data?.data);
      })
      .catch((err) => err.message);
  };
  useEffect(() => {
    getCompanyData(companyId);
    causeOfSurrenderMenu();
    return () => {};
  }, []);

  const [surrDdata, setsurrDdata] = useState<any>({});
  const [SurrFsData, setSurrFsData] = useState<any>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const [surrHData, setsurrHData] = useState<any>({});
  const [ilpSelectedFund, setilpSelectedFund] = useState<any>([]);
  const fillPart = () => {
    return postIlpPartSurrender(
      companyId,
      polid,
      policyRecord.ClientID,
      benId,
      ilppartsurrenderState,
      exfunds
    )
      .then((resp: any) => {
        isSave.current = true;
        setsurrHData(resp.data?.SurrH);
        setsurrDdata(resp.data?.SurrDs);
        setSurrFsData(resp.data?.SurrFs);
        if (ilppartsurrenderState.Function === "Fill") {
          ilppartsurrenderDispatch({ type: ACTIONS.COMMITOPEN });

          ilppartsurrenderState.Function = "Save";
        } else {
          ilppartsurrenderDispatch({ type: ACTIONS.COMMITCLOSE });
          ilppartsurrenderDispatch({ type: ACTIONS.ADDCLOSE });
          setNotify({
            isOpen: true,
            message: `Created record of id:${resp.data?.Created}`,
            type: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setNotify({
          isOpen: true,
          message: err.response.data?.error,
          type: "error",
        });
      });
  };

  const Partsurrender = () => {
    return saveIlpPartSurrender(
      polid,
      companyId,
      surrHData,
      surrDdata,
      SurrFsData
    )
      .then((resp: any) => {
        isSave.current = false;
        ilppartsurrenderDispatch({ type: ACTIONS.ILPPARTSURRENDERCLOSE });
        setilpSelectedFund([]);
        getData();
        setNotify({
          isOpen: true,
          message: `Created record of id:${resp.data?.Created}`,
          type: "success",
        });
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };
  const [benId, setbenId] = useState("");
  const p0050 = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    return axios.get(
      `http://localhost:3000/api/v1/basicservices/paramItem?companyId=${companyId}&name=${name}&languageId=${languageId}&item=${item}`,
      {
        withCredentials: true,
        params: {
          companyId,
          name,
          languageId,
          item,
        },
      }
    );
  };

  const [fundbasicData, setfundbasicData] = useState([]);
  const getfundbasicType = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setfundbasicData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getfundbasicType(companyId, "P0050", languageId, "FundSwitchBasis");
    return () => {};
  }, []);

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    let updateValue = { ...value, isChecked: true };
    if (e.target.checked) {
      const updateArr = [...ilpSelectedFund, updateValue];
      setilpSelectedFund(updateArr);
    }
    if (!e.target.checked) {
      updateValue = { ...value, isChecked: false };
      const updateArr = [...ilpSelectedFund, updateValue];
      const itemIndex = ilpSelectedFund.indexOf(updateValue);
      updateArr.splice(itemIndex, 1);
      setilpSelectedFund(updateArr);
    }
  };

  const handleCheckfund = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    val: any
  ) => {
    const { name, value } = e.target;
    setbenId(ilpPartBenefits[i].ID);
    isChecked.current = e.target.checked;
  };
  useLayoutEffect(() => {
    getfundsbybenefitandpol();
    return () => {};
  }, [benId]);
  useEffect(() => {
    return () => {};
  }, [ilppartsurrenderState.ilppartsurrenderOpen]);
  useEffect(() => {
    if (ilppartsurrenderState.Function === "Fill") {
      setbenId("");
      setexfunds([]);
      setilpSelectedFund([]);
      setsurrHData({});
      setsurrDdata({});
      setSurrFsData([{}]);
      isSave.current = false;
    }
    return () => {
      // Cleanup function (if needed)
    };
  }, [ilppartsurrenderState.ilppartsurrenderOpen === false]);

  useLayoutEffect(() => {
    getbenefitsbypol();
    return () => {};
  }, [ilppartsurrenderState.ilppartsurrenderOpen]);
  return (
    <div>
      <CustomPartSurrender
        open={ilppartsurrenderState.ilppartsurrenderOpen}
        commit={ilppartsurrenderState.commitOpen}
        handleClose={() =>
          ilppartsurrenderDispatch({ type: ACTIONS.ILPPARTSURRENDERCLOSE })
        }
        isSave={isSave.current}
        handleFormSubmit={isSave.current ? Partsurrender : fillPart}
        title={title}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1", "2"]}
        >
          <TreeItem nodeId="1" label={`Policy ${polid}`}>
            <Grid2 container spacing={2}>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="CompanyID"
                  name="CompanyID"
                  value={policyRecord?.CompanyID}
                  placeholder="Company ID"
                  label="Company ID"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="PolicyID"
                  name="PolicyID"
                  value={polid}
                  placeholder="policyId"
                  label="policyId"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="Product"
                  name="Product"
                  value={policyRecord?.PProduct}
                  placeholder="Product"
                  label="Product"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="Frequency"
                  name="Frequency"
                  value={policyRecord?.PFreq}
                  placeholder="Frequency"
                  label="Frequency"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly={ilppartsurrenderState.infoOpen}
                      label="EffectiveDate"
                      inputFormat="DD/MM/YYYY"
                      value={ilppartsurrenderState.EffectiveDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        ilppartsurrenderDispatch({
                          type: ACTIONS.ONCHANGE,
                          payload: date?.$d,
                          fieldName: "EffectiveDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly={ilppartsurrenderState.infoOpen}
                      label="Surrender Date"
                      inputFormat="DD/MM/YYYY"
                      value={ilppartsurrenderState.SurrDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        ilppartsurrenderDispatch({
                          type: ACTIONS.ONCHANGE,
                          payload: date?.$d,
                          fieldName: "SurrDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  select
                  id="Cause"
                  name="Cause"
                  value={ilppartsurrenderState.Cause}
                  placeholder="Surrender By"
                  label="Surrender By"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    ilppartsurrenderDispatch({
                      type: ACTIONS.ONCHANGE,
                      payload: e.target.value,
                      fieldName: "Cause",
                    })
                  }
                  fullWidth
                  margin="dense"
                >
                  {causeOfSurrenderData.map((value: any) => (
                    <MenuItem key={value.item} value={value.item}>
                      {value.item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  multiline
                  id="ReasonDescription"
                  name="ReasonDescription"
                  value={ilppartsurrenderState.ReasonDescription}
                  placeholder="Reason Description"
                  label="Reseon Description"
                  fullWidth
                  margin="dense"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    ilppartsurrenderDispatch({
                      type: ACTIONS.ONCHANGE,
                      payload: e.target.value,
                      fieldName: "ReasonDescription",
                    })
                  }
                />
              </Grid2>
            </Grid2>
            {ilppartsurrenderState.commitOpen ? (
              <Grid2 container spacing={2} style={{ width: "100%" }}>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="paidToDate"
                    name="paidToDate"
                    value={moment(surrHData?.paidToDate).format("YYYY-MM-DD")}
                    placeholder="paidToDate"
                    label="paidToDate"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="BillDate"
                    name="BillDate"
                    value={moment(surrHData?.BillDate).format("YYYY-MM-DD")}
                    placeholder="BillDate"
                    label="BillDate"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="AplAmount"
                    name="AplAmount"
                    value={surrHData?.AplAmount}
                    placeholder="AplAmount"
                    label="AplAmount"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="LoanAmount"
                    name="LoanAmount"
                    value={surrHData?.LoanAmount}
                    placeholder="LoanAmount"
                    label="LoanAmount"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PolicyDepost"
                    name="PolicyDepost"
                    value={surrHData?.PolicyDepost}
                    placeholder="PolicyDepost"
                    label="PolicyDepost"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="CashDeposit"
                    name="CashDeposit"
                    value={surrHData?.CashDeposit}
                    placeholder="CashDeposit"
                    label="CashDeposit"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="RefundPrem"
                    name="RefundPrem"
                    value={surrHData?.RefundPrem}
                    placeholder="RefundPrem"
                    label="RefundPrem"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PremTolerance"
                    name="PremTolerance"
                    value={surrHData?.PremTolerance}
                    placeholder="PremTolerance"
                    label="PremTolerance"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="AdjustedAmount"
                    name="AdjustedAmount"
                    value={surrHData?.AdjustedAmount}
                    placeholder="AdjustedAmount"
                    label="AdjustedAmount"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="TotalSurrPayable"
                    name="TotalSurrPayable"
                    value={surrHData?.TotalSurrPayable}
                    placeholder="TotalSurrPayable"
                    label="TotalSurrPayable"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            ) : null}
          </TreeItem>
          <TreeItem nodeId="2" label={`Benefits`}>
            <Paper className={styles.paperStyle}>
              <Table
                striped
                bordered
                hover
                style={{
                  width: "100%",
                  tableLayout: "fixed",
                  position: "relative",
                }}
              >
                <thead className={styles.header}>
                  <tr>
                    <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 2,
                        width: "100%",
                      }}
                    >
                      Selected
                    </th>
                    <th style={{ width: "100%" }}>Policy ID</th>
                    <th style={{ width: "100%" }}>Benefit ID</th>
                    <th style={{ width: "100%" }}>Client ID</th>
                    <th style={{ width: "100%" }}>BCoverage</th>
                    <th style={{ width: "100%" }}>BSumAssured</th>
                  </tr>
                </thead>
                {ilpPartBenefits?.map((val: any, index: number) => {
                  return (
                    <>
                      <CustomModal size="xl"></CustomModal>
                      <tr>
                        <td>
                          <input
                            className={styles["input-form"]}
                            style={{
                              position: "sticky",
                              left: 0,
                            }}
                            type="radio"
                            name="Select"
                            onChange={(e) => handleCheckfund(e, index, val)}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val.PolicyID}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.ID}
                          />
                        </td>

                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.ClientID}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.BCoverage}
                          />
                        </td>

                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.BSumAssured}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </Table>
            </Paper>
          </TreeItem>

          <TreeItem nodeId="4" label={` Part Surrender Funds`}>
            <Paper className={styles.paperStyle}>
              {benId.length !== 0 && (
                <Table striped bordered hover style={{ position: "relative" }}>
                  <thead className={styles.header}>
                    <tr>
                      <th
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 2,
                          overflow: "hidden",
                        }}
                      >
                        Selected
                      </th>
                      <th> ID</th>
                      <th>Policy ID</th>
                      <th>Benefit ID</th>
                      <th>Fund Code</th>
                      <th>Fund Type</th>
                      <th>Fund Currency</th>
                      <th>Fund Units</th>
                      <th>Surrender By</th>
                      <th>Surrender By Value</th>
                    </tr>
                  </thead>
                  {exfunds?.map((val: any, index: number) => {
                    const isChecked = ilpSelectedFund.some(
                      (selected: { id: any; isChecked: any }) =>
                        selected.id === val.id && selected.isChecked
                    );
                    return (
                      <>
                        <CustomModal size="xl"></CustomModal>
                        <tr key={val.id}>
                          <td>
                            <input
                              className={styles["input-form"]}
                              style={{
                                position: "sticky",
                                left: 0,
                              }}
                              type="checkbox"
                              name="Select"
                              onChange={(e) => handleCheck(e, val, index)}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val.ID}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val.PolicyID}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val.BenefitID}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.FundCode}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.FundType}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.FundCurr}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.FundUnits}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <select
                              className={styles["input-form"]}
                              disabled={!isChecked}
                              name="SurrenderBy"
                              onChange={(e: any) => handleChangeFund(e, index)}
                              value={val?.SurrenderBy}
                            >
                              <option value="">Select an option</option>
                              {fundbasicData.map((option: any) => (
                                <option key={option.code} value={option.code}>
                                  {option.description}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled={!isChecked}
                              name="SurrenderByValue"
                              value={val?.SurrenderByValue}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChangeFund(e, index)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </Table>
              )}
            </Paper>
          </TreeItem>
          {ilppartsurrenderState.commitOpen ? (
            <>
              <div style={{ display: "flex" }}>
                <TreeItem
                  nodeId="5"
                  label={`Fund-wise Part Surrender Values`}
                  style={{ minWidth: "100%" }}
                >
                  <Table
                    striped
                    bordered
                    hover
                    style={{ position: "relative" }}
                  >
                    <thead className={styles.header}>
                      <tr>
                        <th>Fund Code</th>
                        <th>Surrender By</th>
                        <th>Surrender By Value</th>
                        <th>Surr Percentage</th>
                        <th>Surr Amount</th>
                      </tr>
                    </thead>
                    {SurrFsData?.map((val: any, index: number) => {
                      return (
                        <>
                          <CustomModal size="xl"></CustomModal>
                          <tr key={val.id}>
                            <td className={styles["td-class"]}>
                              <input
                                className={styles["input-form"]}
                                type="text"
                                disabled
                                value={val?.FundCode}
                              />
                            </td>
                            <td className={styles["td-class"]}>
                              <input
                                className={styles["input-form"]}
                                type="text"
                                disabled
                                value={val?.SurrenderBy}
                              />
                            </td>
                            <td className={styles["td-class"]}>
                              <input
                                className={styles["input-form"]}
                                type="text"
                                disabled
                                value={val?.SurrenderByValue}
                              />
                            </td>
                            <td className={styles["td-class"]}>
                              <input
                                className={styles["input-form"]}
                                type="text"
                                disabled={!isChecked}
                                value={val?.SurrPercentage}
                              />
                            </td>
                            <td className={styles["td-class"]}>
                              <input
                                className={styles["input-form"]}
                                type="text"
                                disabled={!isChecked}
                                value={val?.SurrAmount}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </Table>
                </TreeItem>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "5px",
                  }}
                ></div>
              </div>
            </>
          ) : null}
          {ilppartsurrenderState.commitOpen ? (
            <>
              {surrDdata.BCoverage === "" ? null : (
                <div style={{ display: "flex" }}>
                  <TreeItem
                    nodeId="3"
                    label={`Surrender Details `}
                    style={{ minWidth: "100%" }}
                  >
                    <Grid2 container spacing={2}>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          id="BCoverage"
                          name="BCoverage"
                          value={surrDdata.BCoverage}
                          placeholder="BCoverage"
                          label="BCoverage"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        ></TextField>
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="BSumAssured"
                          name="BSumAssured"
                          value={surrDdata.BSumAssured}
                          placeholder="b_sum_assured"
                          label="b_sum_assured"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="RevBonus"
                          name="RevBonus"
                          value={surrDdata.RevBonus}
                          placeholder="RevBonus"
                          label="RevBonus"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="AddlBonus"
                          name="AddlBonus"
                          value={surrDdata.AddlBonus}
                          placeholder="AddlBonus"
                          label="AddlBonus"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="TerminalBonus"
                          name="TerminalBonus"
                          value={surrDdata.TerminalBonus}
                          placeholder="TerminalBonus"
                          label="TerminalBonus"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="InterimBonus"
                          name="InterimBonus"
                          value={surrDdata.InterimBonus}
                          placeholder="InterimBonus"
                          label="InterimBonus"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="LoyaltyBonus"
                          name="LoyaltyBonus"
                          value={surrDdata.LoyaltyBonus}
                          placeholder="LoyaltyBonus"
                          label="LoyaltyBonus"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="OtherAmount"
                          name="OtherAmount"
                          value={surrDdata.OtherAmount}
                          placeholder="OtherAmount"
                          label="OtherAmount"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="AccumDividend"
                          name="AccumDividend"
                          value={surrDdata.AccumDividend}
                          placeholder="AccumDividend"
                          label="AccumDividend"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="AccumDivInt"
                          name="AccumDivInt"
                          value={surrDdata.AccumDivInt}
                          placeholder="AccumDivInt"
                          label="AccumDivInt"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="TotalFundValue"
                          name="TotalFundValue"
                          value={surrDdata.TotalFundValue}
                          placeholder="TotalFundValue"
                          label="TotalFundValue"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="SurrPenalty"
                          name="SurrPenalty"
                          value={surrDdata.SurrPenalty}
                          placeholder="Surrender Penalty"
                          label="Surrender Penalty"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="SurrTax"
                          name="SurrTax"
                          value={surrDdata.SurrTax}
                          placeholder="Surrender Tax"
                          label="Surrender Tax"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="SurrAmount"
                          name="SurrAmount"
                          value={surrDdata.SurrAmount}
                          placeholder="SurrAmount"
                          label="SurrAmount"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="TotalSurrAmount"
                          name="TotalSurrAmount"
                          value={surrDdata.TotalSurrAmount}
                          placeholder="TotalSurrAmount"
                          label="TotalSurrAmount"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                    </Grid2>
                  </TreeItem>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "5px",
                    }}
                  ></div>
                </div>
              )}
            </>
          ) : null}
        </TreeView>
      </CustomPartSurrender>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default PartSurrender;
