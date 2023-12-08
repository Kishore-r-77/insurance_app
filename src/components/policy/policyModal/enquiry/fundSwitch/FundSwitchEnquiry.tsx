import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import moment from "moment";
import FundSwitchModal from "./FundSwitchModal";
import styles from "./fundSwitchEnquiry.module.css";
import { useEffect, useReducer, useState } from "react";
import GLHistoryEnquiry from "../GLHistoryEnquiry";
import axios from "axios";
import { FormControl } from "react-bootstrap";
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { GLColumns } from "./fundSwitchGLEnq";
export default function FundSwitchEnquiry({
  open: fundOpen,
  handleClose,
  fundSwitchOpen,
  fundswitchData: row,
  policyNo,
  Tranno,
  historyCode
}: any) {
  const [open, setOpen] = useState(false);

  const [isGlOpen, setisGlOpen] = useState(false);
  const [isFundOpen, setisFundOpen] = useState(false)

  console.log(policyNo, "Policy No in fund switch");
  console.log(historyCode, "History Code in fund switch");

  const glOpen = () => {
    setisGlOpen(true);
  };

  const glClose = () => {
    setisGlOpen(false);
    setmenuVal("FundSwitch")
  };

const [FundSeqData, setFundSeqData] = useState([])
  const geFundSwitchSeq = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramItem?companyId=1&name=P0050&languageId=1&item=${historyCode}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setFundSeqData(resp.data.param.data.dataPairs);
      })
      .catch((err) => console.log(err.message));
  };
  console.log(FundSeqData, "***************88");

  const [fundState, setfundState] = useState({
    fundopen: false,
    glHistory: false,
  });

  const initialValues ={
    fundopen:false,
    glHistory:false
  }



  const [menuVal, setmenuVal] = useState("FundSwitch")

  const handleChange = (event: SelectChangeEvent) => {
    setmenuVal(event.target.value);
  };

useEffect(() => {
  switch(menuVal){
    case "GLHistory":
      glOpen()
      case "FundSwitch":
        setisFundOpen(true)
   }
}, [menuVal])


  
useEffect(() => {
  geFundSwitchSeq()
  return () => {
  }
}, [fundOpen===true])


  return (
    <FundSwitchModal
      size="xl"
      open={fundOpen}
      handleClose={handleClose}
      title="Ilp Switch Detail"
      // handleFormSubmit={glOpen}
    >

<TextField
            select
            value={menuVal}
            
            placeholder="Fund Switch Menu"
            label="Fund Menu"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
             handleChange(e)
            }
            style={{ width: "10rem", height:"5rem", float:"right"}}
          >
            {FundSeqData.map((value: any) => (
              <MenuItem key={value.code} value={value.code}>
                {value.code}
              </MenuItem>
            ))}
          </TextField>
        {isGlOpen? <GLHistoryEnquiry
        open={isGlOpen}
        handleClose={glClose}
        policyNo={policyNo}
        TransactionNo={Tranno}
      />: <TableContainer component={Paper}>
      <h2 style={{ backgroundColor: "#c0d4e2", textAlign: "center" }}>
        Ilp Switch Header
      </h2>
      <Table aria-label="collapsible table">
        <TableHead className={styles["table-head"]}>
          <TableRow>
            <TableCell />
            <TableCell className={styles.thstyle}>PolicyID</TableCell>
            <TableCell className={styles.thstyle}>BenefitID</TableCell>
            <TableCell className={styles.thstyle}>EffectiveDate</TableCell>
            <TableCell className={styles.thstyle}>FundSwitchBasis</TableCell>
            <TableCell className={styles.thstyle}>Switch Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{ "& > *": { borderBottom: "unset" } }}
            style={{ backgroundColor: "#f0f8ff" }}
          >
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell className={styles.tdstyle}>{row?.PolicyID}</TableCell>
            <TableCell className={styles.tdstyle}>{row?.BenefitID}</TableCell>
            <TableCell className={styles.tdstyle}>
              {moment(row?.EffectiveDate).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell className={styles.tdstyle}>
              {row?.FundSwitchBasis}
            </TableCell>
            <TableCell className={styles.tdstyle}>{row?.SwitchFee}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={6}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    textAlign="center"
                    style={{ backgroundColor: "#a2c8e3" }}
                  >
                    Ilp Switch Funds
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead className={styles["table-head"]}>
                      <TableRow>
                        <TableCell className={styles.thstyle}>
                          Policy Id
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          Benefit Id
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          EffectiveDate
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          SwitchDirection
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          Fund Code
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          Fund Type
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          Fund Units
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          Fund Amount
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          Fund Percentage
                        </TableCell>
                        <TableCell className={styles.thstyle}>
                          FundCurr
                        </TableCell>
                        <TableCell className={styles.thstyle} align="right">
                          FundPrice
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row?.IlpSwitchFunds?.map(
                        (funds: any, index: number) => (
                          <TableRow
                            key={funds.PolicyID}
                            style={{
                              background:
                                index % 2 === 0 ? "#f0f8ff" : "#d3e0ea", // Light blue for even rows, slightly darker blue for odd rows
                              transition: "background 0.3s ease-in-out", // Add a smooth transition effect
                            }}
                          >
                            <TableCell
                              className={styles.tdstyle}
                              component="th"
                              scope="row"
                            >
                              {funds.PolicyID}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.BenefitID}
                            </TableCell>
                            <TableCell>
                              {moment(funds.EffectiveDate).format(
                                "DD-MM-YYYY"
                              )}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.SwitchDirection}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.FundCode}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.FundType}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.FundUnits}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.FundAmount}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.FundPercentage}
                            </TableCell>
                            <TableCell className={styles.tdstyle}>
                              {funds.FundCurr}
                            </TableCell>
                            <TableCell
                              className={styles.tdstyle}
                              align="right"
                            >
                              {funds.FundPrice}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>}
     
      {/* <GLHistoryEnquiry
        open={isGlOpen}
        handleClose={glClose}
        policyNo={policyNo}
        TransactionNo={Tranno}
      /> */}
    </FundSwitchModal>
  );
}
