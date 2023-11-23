import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CustomFullModal from "../../../../utilities/modal/CustomFullModal";
import moment from "moment";
import styles from "./fundSwitchEnquiry.module.css";
import CustomModal from "../../../../utilities/modal/CustomModal";

export default function FundSwitchEnquiry({
  open: fundOpen,
  handleClose,
  fundswitchData: row,
}: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <CustomModal
      size="xl"
      open={fundOpen}
      handleClose={handleClose}
      title="Ilp Switch Detail"
    >
      <TableContainer component={Paper}>
        <h2 style={{ textAlign: "center" }}>Ilp Switch Header</h2>
        <Table aria-label="collapsible table">
          <TableHead className={styles["table-head"]}>
            <TableRow>
              <TableCell />
              <TableCell className={styles.thstyle}>PolicyID</TableCell>
              <TableCell className={styles.thstyle}>BenefitID</TableCell>
              <TableCell className={styles.thstyle}>EffectiveDate</TableCell>
              <TableCell className={styles.thstyle}>FundSwitchBasis</TableCell>
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
      </TableContainer>
    </CustomModal>
  );
}
