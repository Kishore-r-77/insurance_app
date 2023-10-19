import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomIlpTopupModal from "./CustomIlpTopupModal";
import styles from "./ilptopupModal.module.css";
import { getBusinessDateApi } from "../surrenderModal/surrenderApi";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function IlpTopupModal({
  open,
  handleClose,
  data,
  completed,
  setcompleted,
  getData,
  polid,
}: any) {
  const size: string = "xl";
  const title: string = "ILP Topup";
  const [ilpfunc, setilpfunc] = useState<any>("Init");
  const [result, setresult] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  console.log(open, "open");

  const [isResult, setIsResult] = useState(false);
  const [ilpTopupBenefits, setilpTopupBenefits] = useState([]);
  const [exfunds, setexfunds] = useState([]);

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
        `http://localhost:3000/api/v1/ilpservices/ilpfundbypolandben/${polid}/${benId}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setexfunds(resp.data["Ilp Funds"]);
      });
  };

  const userId = useAppSelector((state) => state.users.user.message.id);
  const companyId = useAppSelector((state) => state.users.user.message.companyId);
  const [businessData, setBusinessData] = useState<any>({});
  const [effDate, setEffDate] = useState<any>();
  const getBusinessDate = (companyId: number, userId: number) => {
    return getBusinessDateApi(companyId, userId)
      .then((resp) => {
        setBusinessData(resp.data);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getBusinessDate(companyId, userId);
    setEffDate(businessData?.BusinessDate)
    return () => {};
  }, []);

  // const effDate = moment(data?.ProposalReceivedDate, "DD/MM/YYYY");

  const [prem, setprem] = useState<any>(0.0);
  const [ilpPriceData, setilpPriceData] = useState<any>([]);
  const [ilpPriceArray, setilpPriceArray] = useState<any>([]);

  const doIlpTopup = () => {
    const updatedIlpPriceArray = ilpPriceData.map((val: any) => ({
      ...val,
      FundPercentage: parseFloat(val.FundPercentage),
    }));

    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/ilpTopUp`,
        {
          PolicyID: data?.PolicyId,
          BenefitID: benId,
          ClientID: data?.OwnerId,
          CompanyID: data?.CompanyId,
          EffectiveDate: moment(effDate).format("YYYYMMDD"),
          Function: ilpfunc,
          Premium: parseFloat(prem),
          Funds: updatedIlpPriceArray,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcompleted(true);
        setilpfunc("Check");

        setilpPriceData(resp.data?.Funds);
        // setilpPriceArray(resp.data?.Funds);
        if (ilpfunc === "Check") {
          //   handleClose();
          //   getData();
          setNotify({
            isOpen: true,
            message: resp.data?.success,
            type: "success",
          });
          setilpfunc("Save");
          setilpPriceData(resp.data?.Funds);

          // setilpPriceArray(resp.data?.Funds);
          setIsResult(true);
          // setresult(resp.data);
        }
        if (ilpfunc === "Save") {
          handleClose();
          getData();
          setilpPriceData(resp.data?.Funds);
          setNotify({
            isOpen: true,
            message: resp.data?.result,
            type: "success",
          });
          setbenId("");
          setprem(0);
          setilpPriceData([]);
          setilpPriceArray([]);
          setexfunds([]);
          setilpfunc("Init");
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
  const handleBenChange = (e: any) => {
    setbenId(e.target.value);
  };

  const handlePremChange = (e: any) => {
    setprem(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setilpPriceData((prevData: any) => {
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

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    if (e.target.checked) {
      console.log(value, index, "val", "ind");
      const updateArr = [...ilpPriceArray, value];
      setilpPriceArray(updateArr);
      value.selected = true;
      setSelectOne(value.selected);
    }
    if (!e.target.checked) {
      console.log(index, "index");
      const updateArr = [...ilpPriceArray];
      const itemIndex = ilpPriceArray.indexOf(value);
      updateArr.splice(itemIndex, 1);
      setilpPriceArray(updateArr);
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

  console.log(ilpPriceArray, "handleCheck");
  console.log(ilpPriceData, "Funds");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    // Update the ilpPriceArray based on whether "Select All" is checked
    if (isChecked) {
      // Add all values to ilpPriceArray
      //setEditableRowId(value.FundCode)
      setilpPriceArray(ilpPriceData.map((value: any) => value));
    } else {
      // Clear ilpPriceArray
      setilpPriceArray([]);
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

  return (
    <div>
      <CustomIlpTopupModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={doIlpTopup}
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
                        //readOnly={maturityState.infoOpen}
                        label="EffectiveDate"
                        inputFormat="DD/MM/YYYY"
                        value={effDate}
                        onChange={(date) => effDatechange(date)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
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
              </Grid2>
              <Grid2 lg={4}>
                <TextField
                  id="Total Premium"
                  name="Total Premium"
                  value={result?.TotalPrem}
                  placeholder="Total Premium"
                  label="Total Premium"
                  onChange={handlePremChange}
                  fullWidth
                  //inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                ></TextField>
              </Grid2>
            </Grid2>
          </TreeItem>
          <TreeItem nodeId="2" label={`Existing ILP Funds`}>
            <Table striped bordered hover>
              <thead className={styles.header}>
                <tr>
                  <th>Fund Code</th>
                  <th>Fund Currency</th>
                  <th>Fund Type</th>
                  <th>Fund Percentage</th>
                </tr>
              </thead>
              {exfunds.map((value: any, index: number) => (
                <tbody>
                  <tr>
                    <td>{value?.FundCode}</td>
                    <td>{value?.FundCurr}</td>
                    <td>{value?.FundType}</td>
                    <td>{value?.FundPercentage}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </TreeItem>
          <TreeItem nodeId="3" label={`New ILP Funds`}>
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
                    <input type="checkbox" onChange={handleSelectAll} />
                  </th>

                  <th>Fund Code</th>
                  <th>Fund Currency</th>
                  <th>Fund Type</th>
                  <th>Fund Percentage</th>
                </tr>
              </thead>
              {ilpPriceData?.map((value: any, index: number) => (
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
                    <td>
                      <input
                        className={styles["input-form"]}
                        type="number"
                        name="FundPercentage"
                        disabled={!selectOne}
                        value={value?.FundPercentage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </TreeItem>
        </TreeView>
      </CustomIlpTopupModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default IlpTopupModal;
