import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useBusinessDate } from "../../contexts/BusinessDateContext";
import CustomIlpFundSwitchModal from "./CustomIlpFundSwitchModal";
import styles from "./ilpfundswitchModal.module.css";

function IlpFundSwitchModal({
  open,
  handleClose,
  data,
  completed,
  setcompleted,
  getData,
  polid,
}: any) {
  const size: string = "xl";
  const title: string = "ILP FundSwitch";
  const [ilpfunc, setilpfunc] = useState<any>("Calculate");
  const [result, setresult] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  console.log(open, "open");

  const [isResult, setIsResult] = useState(false);
  const [ilpTopupBenefits, setilpTopupBenefits] = useState<any>([]);
  const [funds, setfunds] = useState<any>([]);
  const [exfunds, setexfunds] = useState<any>([]);
  const [fundswitch, setfundswitch] = useState<any>([]);

  useEffect(() => {
    return () => {};
  }, [open === false]);

  // useEffect(() => {
  //   setEffDate("");
  //   return () => {};
  // }, [open === false]);

  const effDatechange = (date: any) => {
    console.log("Date", date);
    setEffDate(date + 1);
  };

  const getbenefitsbypol = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/benefitgetbypol/${polid}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setilpTopupBenefits(resp.data?.Benefit);
      });
  };

  const getfundsbybenefitandpol = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/customerservice/switchfundinit/${polid}/${benId}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setfundswitch(resp?.data?.IlpSwitchHeader);
        setfunds(resp?.data?.IlpSwitchHeader?.IlpSwitchSource);
        setexfunds(resp?.data?.IlpSwitchHeader?.IlpSwitchTarget);
      });
  };
  console.log(exfunds, "........", funds, "-------", fundswitch);

  const userId = useAppSelector((state) => state.users.user.message.id);
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [businessData, setBusinessData] = useState<any>({});
  const [effDate, setEffDate] = useState<any>();
  // const getBusinessDate = (companyId: number, userId: number) => {
  //   return getBusinessDateApi(companyId, userId)
  //     .then((resp) => {
  //       setBusinessData(resp.data);
  //     })
  //     .catch((err) => err.message);
  // };
  //console.log("BD", businessData)

  useEffect(() => {
    //getBusinessDate(companyId, userId);
    setEffDate(businessDate);
    return () => {};
  }, [open]);

  // const effDate = moment(data?.ProposalReceivedDate, "DD/MM/YYYY");

  const [prem, setprem] = useState<any>(0.0);
  const [switchBasic, setswitchBasic] = useState(fundswitch?.FundSwitchBasis);
  //const [ilpPriceData, setilpPriceData] = useState<any>([]);
  //const [ilpPriceArray, setexfunds] = useState<any>([]);
  const [ilpFund, setIlpFund] = useState([]);
  const [newilpFund, setnewIlpFund] = useState([]);

  const doIlpFundSwitch = () => {
    const updatedIlpFund = funds.map((val: any) => ({
      ...val,
      FundUnits: parseFloat(val.FundUnits),
      FundAmount: parseFloat(val.FundAmount),
      FundPercentage: parseFloat(val?.FundPercentage),
    }));
    // const updatedIlpFundSwitch = exfunds.map((val: any) => ({
    //   ...val,
    //   FundPercentage: parseFloat(val?.FundPercentage),
    // }));

    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/switchfund`,
        {
          PolicyID: data?.PolicyId,
          BenefitID: benId,
          CompanyID: companyId,
          EffectiveDate: moment(effDate).format("YYYYMMDD"),
          Function: ilpfunc,
          FundSwitchBasis: switchBasic,
          IlpSwitchSource: updatedIlpFund,
          IlpSwitchTarget: exfunds
            .filter(
              (data: any) =>
                data.FundPercentage !== null &&
                data.FundPercentage !== undefined &&
                data.FundPercentage !== "" &&
                data.FundPercentage !== 0
            )
            .map((data: any) => ({
              ...data,
              FundCode: data.FundCode,
              FundType: data.FundType,
              FundPercentage: parseFloat(data?.FundPercentage),
              FundCurr: data.FundCurr,
            })),
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcompleted(true);
        setilpfunc("Calculate");

        setIlpFund(resp?.data?.IlpSwitchFundsSource);
        setnewIlpFund(resp?.data?.IlpSwitchFundsTarget);
        // setexfunds(resp.data?.Funds);
        if (ilpfunc === "Calculate") {
          //   handleClose();
          //   getData();
          setNotify({
            isOpen: true,
            message: resp.data?.success,
            type: "success",
          });
          setilpfunc("Save");
          setIlpFund(resp?.data?.IlpSwitchFundsSource);
          setnewIlpFund(resp?.data?.IlpSwitchFundsTarget);
          // setexfunds(resp.data?.Funds);
          setIsResult(true);
          // setresult(resp.data);
        }
        if (ilpfunc === "Save") {
          handleClose();
          getData();
          setIlpFund(resp?.data?.IlpSwitchFundsSource);
          setnewIlpFund(resp?.data?.IlpSwitchFundsTarget);
          setNotify({
            isOpen: true,
            message: resp.data?.result,
            type: "success",
          });
          setbenId("");
          setprem(0);
          setfunds([]);
          setexfunds([]);
          //setilpfunc("Init");
          setcompleted(false);
          setIsResult(false);
        }
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const [benId, setbenId] = useState("");
  const handleBenChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    val: any
  ) => {
    setbenId(ilpTopupBenefits[i].ID);
  };

  const handlePremChange = (e: any) => {
    setprem(e.target.value);
  };
  const handleFundSwitchChange = (e: any) => {
    setswitchBasic(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setfunds((prevData: any) => {
      const newData = [...prevData];
      newData[i] = { ...newData[i], [name]: value };
      return newData;
    });
  };
  const handleexChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { name, value } = e.target;

    setexfunds((prevData: any) => {
      const newData = [...prevData];
      newData[i] = { ...newData[i], [name]: value };
      return newData;
    });
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const [selectAll, setSelectAll] = useState(false);
  const [selectOne, setSelectOne] = useState(false);

  const handleFundCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    if (e.target.checked) {
      console.log(value, index, "val", "ind");
      // const updateArr = [...funds, value];
      // setfunds(updateArr);
      value.selected = true;
      setSelectOne(value.selected);
    }
    if (!e.target.checked) {
      console.log(index, "index");
      // const updateArr = [...funds];
      // const itemIndex = funds.indexOf(value);
      // updateArr.splice(itemIndex, 1);
      // setfunds(updateArr);
      value.selected = false;
      setSelectOne(value.selected);
    }
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    if (e.target.checked) {
      console.log(value, index, "val", "ind");
      // const updateArr = [...exfunds, value];
      // setexfunds(updateArr);
      value.selected = true;
      setSelectOne(value.selected);
    }
    if (!e.target.checked) {
      console.log(index, "index");
      // const updateArr = [...exfunds];
      // const itemIndex = exfunds.indexOf(value);
      // updateArr.splice(itemIndex, 1);
      // setexfunds(updateArr);
      value.selected = false;
      setSelectOne(value.selected);
    }
  };

  // const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   isChecked.current = e.target.checked;
  //   setilpPriceData(
  //     ilpPriceData.map((ilpfunds: any, index: number) => {
  //       if (index === i && isChecked.current) {
  //         return { ...ilpfunds, Select: "X" };
  //       } else if (index === i && !isChecked.current) {
  //         return { ...ilpfunds, Select: "" };
  //       } else return ilpfunds;
  //     })
  //   );
  // };

  //console.log(ilpPriceArray, "handleCheck");
  console.log(funds, "Funds");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    // Update the ilpPriceArray based on whether "Select All" is checked
    if (isChecked) {
      // Add all values to ilpPriceArray
      //setEditableRowId(value.FundCode)
      setfunds(funds.map((value: any) => value));
    } else {
      // Clear ilpPriceArray
      //setfunds([]);
    }
  };
  const handleexSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    // Update the ilpPriceArray based on whether "Select All" is checked
    if (isChecked) {
      // Add all values to ilpPriceArray
      //setEditableRowId(value.FundCode)
      setexfunds(exfunds.map((value: any) => value));
    } else {
      // Clear ilpPriceArray
      //setfunds([]);
    }
  };

  useLayoutEffect(() => {
    getbenefitsbypol();
    return () => {};
  }, [open]);

  useLayoutEffect(() => {
    getfundsbybenefitandpol();
    return () => {};
  }, [benId]);

  useEffect(() => {
    setbenId("");
    setfunds([]);
    setexfunds([]);
    setfundswitch([]);
    setswitchBasic("");

    return () => {};
  }, [open]);

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

  const [fundDirectionData, setfundDirectionData] = useState([]);
  const getfundDirectionType = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setfundDirectionData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getfundDirectionType(companyId, "P0050", languageId, "SwitchDirection");
    return () => {};
  }, []);

  return (
    <div>
      <CustomIlpFundSwitchModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={doIlpFundSwitch}
        size={size}
        title={title}
        completed={completed}
        isResult={isResult}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1", "2"]}
        >
          <TreeItem nodeId="1" label={`Policies`}>
            <Grid2 container spacing={2}>
              <Grid2 lg={4}>
                <TextField
                  id="PolicyID"
                  name="PolicyID"
                  value={data?.PolicyId}
                  placeholder="PolicyID"
                  label="PolicyID"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="OwnerName"
                  name="OwnerName"
                  value={data?.OwnerName}
                  placeholder="OwnerName"
                  label="OwnerName"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Current Date"
                  name="Current Date"
                  value={formattedToday}
                  placeholder="Current Date"
                  label="Current Date"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Premium Risk Cessastion Date"
                  name="Premium Risk Cessastion Date"
                  value={data?.Rcd}
                  placeholder="Premium Risk Cessastion Date"
                  label="Premium Risk Cessastion Date"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Intallment Premium"
                  name="Intallment Premium"
                  value={data?.InstalmentPrem}
                  placeholder="Intallment Premium"
                  label="Intallment Premium"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Paid To Date"
                  name="Paid To Date"
                  value={data?.Ptdate}
                  placeholder="Paid To Date"
                  label="Paid To Date"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Frequency"
                  name="Frequency"
                  value={data?.Frequency}
                  placeholder="Frequency"
                  label="Frequency"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Bill To Date"
                  name="Bill To Date"
                  value={data?.Btdate}
                  placeholder="Bill To Date"
                  label="Bill To Date"
                  onChange={handlePremChange}
                  fullWidth
                  //inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="PolicyDeposit"
                  name="PolicyDeposit"
                  value={data?.PolicyDeposit}
                  placeholder="PolicyDeposit"
                  label="PolicyDeposit"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      InputProps={{ readOnly: true }}
                      label="EffectiveDate"
                      inputFormat="DD/MM/YYYY"
                      value={effDate}
                      onChange={handlePremChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>
              {/* <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  select
                  id="Benefit"
                  name="Benefit"
                  value={benId}
                  placeholder="Benefit"
                  label="Benefit"
                  onChange={handleBenChange}
                  fullWidth
                  margin="dense"
                >
                  {ilpTopupBenefits.map((val: any) => (
                    <MenuItem value={val.ID}>
                      {val.ID} - {val.BCoverage}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2> */}
              <Grid2 lg={4}>
                <TextField
                  select
                  id="Fund SwitchBasis"
                  name="Fund SwitchBasis"
                  value={switchBasic}
                  placeholder="Fund SwitchBasis"
                  label="Fund SwitchBasis"
                  //onChange={handleFundSwitchChange}
                  onChange={handleFundSwitchChange}
                  fullWidth
                  //inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                >
                  {fundbasicData.map((val: any) => (
                    <MenuItem value={val.code}>{val.description}</MenuItem>
                  ))}
                </TextField>
              </Grid2>
            </Grid2>
          </TreeItem>
          <TreeItem nodeId="2" label={`Benefits`}>
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
                  <th style={{ width: "100%" }}>BStart Date</th>
                  <th style={{ width: "100%" }}>BSumAssured</th>
                  <th style={{ width: "100%" }}>BTerm</th>
                  <th style={{ width: "100%" }}>BPTerm</th>
                  <th style={{ width: "100%" }}>BPrem</th>
                  <th style={{ width: "100%" }}>BGender</th>
                  <th style={{ width: "100%" }}>BDOB</th>
                </tr>
              </thead>
              {ilpTopupBenefits?.map((val: any, index: number) => {
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
                          onChange={(e) => handleBenChange(e, index, val)}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={val?.PolicyID}
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
                          value={moment(val?.BStartDate).format("DD-MM-YYYY")}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          name="BSumAssured"
                          disabled={val?.Select === ""}
                          style={{
                            backgroundColor:
                              val.Select === "X" ? "#caccca" : "",
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          value={val?.BSumAssured}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          name="BTerm"
                          disabled={val?.Select === ""}
                          style={{
                            backgroundColor:
                              val.Select === "X" ? "#caccca" : "",
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          value={val?.BTerm}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          name="BPTerm"
                          disabled={val?.Select === ""}
                          style={{
                            backgroundColor:
                              val.Select === "X" ? "#caccca" : "",
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          value={val?.BPTerm}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          name="BPrem"
                          disabled={val?.Select === ""}
                          style={{
                            backgroundColor:
                              val.Select === "X" ? "#caccca" : "",
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          value={val?.BPrem}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={val?.BGender}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={moment(val?.BDOB).format("DD-MM-YYYY")}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </Table>
          </TreeItem>
          <TreeItem nodeId="3" label={`Source Funds`}>
            {ilpfunc == "Save" ? (
              <Table striped bordered hover>
                <thead className={styles.header}>
                  <tr>
                    {/* <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 2,
                        overflow: "hidden",
                      }}
                    > */}
                    {/* Selected
                      <br /> */}
                    {/* <input type="checkbox" onChange={handleSelectAll} /> */}
                    {/* </th> */}

                    <th>Fund Code</th>
                    <th>Fund Currency</th>
                    <th>Fund Type</th>
                    <th>Fund Amount</th>
                    <th>Esstiamte FundUnits</th>
                    <th>Esstiamte FundPercentage</th>
                  </tr>
                </thead>
                {ilpFund?.map((value: any, index: number) => (
                  <tbody>
                    <tr>
                      {/* <td>
                        <input
                          type="checkbox"
                          checked={selectAll || value.selected}
                          onChange={(e) => handleFundCheck(e, value, index)}
                        />
                      </td> */}
                      <td>{value?.FundCode}</td>
                      <td>{value?.FundCurr}</td>
                      <td>{value?.FundType}</td>
                      <td>{value?.FundAmount}</td>
                      <td>{value?.FundUnits}</td>
                      <td>{value?.FundPercentage}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            ) : (
              <Table striped bordered hover>
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
                      <br />
                      {/* <input type="checkbox" onChange={handleSelectAll} /> */}
                    </th>

                    <th>Fund Code</th>
                    <th>Fund Currency</th>
                    <th>Fund Type</th>
                    <th>Available FundAmount</th>
                    <th>Available Units</th>
                    <th>Esstiamte FundAmount</th>
                    <th>Esstiamte FundUnits</th>
                    <th>Esstiamte FundPercentage</th>
                  </tr>
                </thead>
                {funds?.map((value: any, index: number) => (
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectAll || value.selected}
                          onChange={(e) => handleFundCheck(e, value, index)}
                        />
                      </td>
                      <td>{value?.FundCode}</td>
                      <td>{value?.FundCurr}</td>
                      <td>{value?.FundType}</td>
                      <td>{value?.AvailableAmount}</td>
                      <td>{value?.AvailableUnits}</td>
                      {switchBasic == "A" ? (
                        <td>
                          <input
                            className={styles["input-form"]}
                            type="number"
                            name="FundAmount"
                            disabled={!selectOne}
                            value={value?.FundAmount}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                          />
                        </td>
                      ) : (
                        <td>{value?.FundAmount}</td>
                      )}
                      {switchBasic == "U" ? (
                        <td>
                          <input
                            className={styles["input-form"]}
                            type="number"
                            name="FundUnits"
                            disabled={!selectOne}
                            value={value?.FundUnits}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                          />
                        </td>
                      ) : (
                        <td>{value?.FundUnits}</td>
                      )}
                      {switchBasic == "P" ? (
                        <td>
                          <input
                            className={styles["input-form"]}
                            type="number"
                            name="FundPercentage"
                            disabled={!selectOne}
                            value={value?.FundPercentage}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                          />
                        </td>
                      ) : (
                        <td>{value?.FundPercentage}</td>
                      )}
                    </tr>
                  </tbody>
                ))}
              </Table>
            )}
          </TreeItem>
          <TreeItem nodeId="4" label={`Target Funds`}>
            {ilpfunc == "Save" ? (
              <Table striped bordered hover>
                <thead className={styles.header}>
                  <tr>
                    {/* <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 2,
                        overflow: "hidden",
                      }}
                    > */}
                    {/* Selected
                    <br /> */}
                    {/* <input type="checkbox" onChange={handleexSelectAll} /> */}
                    {/* </th> */}
                    <th>Fund Code</th>
                    <th>Fund Currency</th>
                    <th>Fund Type</th>
                    <th>Esstiamte FundAmount</th>
                    <th>Esstiamte FundUnits</th>
                    <th>Esstiamte FundPercentage</th>
                  </tr>
                </thead>
                {newilpFund?.map((value: any, index: number) => (
                  <tbody>
                    <tr>
                      {/* <td>
                        <input
                          type="checkbox"
                          checked={selectAll || value.selected}
                          onChange={(e) => handleCheck(e, value, index)}
                        />
                      </td> */}
                      <td>{value?.FundCode}</td>
                      <td>{value?.FundCurr}</td>
                      <td>{value?.FundType}</td>
                      <td>{value?.FundAmount}</td>
                      <td>{value?.FundUnits}</td>
                      <td>{value?.FundPercentage}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            ) : (
              <Table striped bordered hover>
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
                      <br />
                      {/* <input type="checkbox" onChange={handleexSelectAll} /> */}
                    </th>

                    <th>Fund Code</th>
                    <th>Fund Currency</th>
                    <th>Fund Type</th>
                    <th>Esstiamte FundAmount</th>
                    <th>Esstiamte FundUnits</th>
                    <th>Esstiamte FundPercentage</th>
                  </tr>
                </thead>
                {exfunds?.map((value: any, index: number) => (
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectAll || value.selected}
                          onChange={(e) => handleCheck(e, value, index)}
                        />
                      </td>
                      <td>{value?.FundCode}</td>
                      <td>{value?.FundCurr}</td>
                      <td>{value?.FundType}</td>
                      <td>{value?.FundAmount}</td>
                      <td>{value?.FundUnits}</td>
                      <td>
                        <input
                          className={styles["input-form"]}
                          type="number"
                          name="FundPercentage"
                          disabled={!selectOne}
                          value={value?.FundPercentage}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleexChange(e, index)
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            )}
          </TreeItem>
        </TreeView>
      </CustomIlpFundSwitchModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default IlpFundSwitchModal;
