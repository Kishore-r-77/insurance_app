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

export default function FundSwitchEnquiry({
  open: fundOpen,
  handleClose,
  fundswitchData: row,
}: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <CustomFullModal
      open={fundOpen}
      handleClose={handleClose}
      title="Ilp Switch Detail"
    >
      <TableContainer component={Paper}>
        <h2 style={{ textAlign: "center" }}>Ilp Switch Header</h2>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>PolicyID</TableCell>
              <TableCell>BenefitID</TableCell>
              <TableCell>EffectiveDate</TableCell>
              <TableCell>FundSwitchBasis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>{row?.PolicyID}</TableCell>
              <TableCell>{row?.BenefitID}</TableCell>
              <TableCell>
                {moment(row?.EffectiveDate).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell>{row?.FundSwitchBasis}</TableCell>
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
                      <TableHead>
                        <TableRow>
                          <TableCell>Policy Id</TableCell>
                          <TableCell>Benefit Id</TableCell>
                          <TableCell>EffectiveDate</TableCell>
                          <TableCell>SwitchDirection</TableCell>
                          <TableCell>Fund Code</TableCell>
                          <TableCell>Fund Type</TableCell>
                          <TableCell>FundCurr</TableCell>
                          <TableCell align="right">FundPrice</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row?.IlpSwitchFunds?.map((funds: any) => (
                          <TableRow key={funds.PolicyID}>
                            <TableCell component="th" scope="row">
                              {funds.PolicyID}
                            </TableCell>
                            <TableCell>{funds.BenefitID}</TableCell>
                            <TableCell>
                              {moment(funds.EffectiveDate).format("DD-MM-YYYY")}
                            </TableCell>
                            <TableCell>{funds.SwitchDirection}</TableCell>
                            <TableCell>{funds.FundCode}</TableCell>
                            <TableCell>{funds.FundType}</TableCell>
                            <TableCell>{funds.FundCurr}</TableCell>
                            <TableCell align="right">
                              {funds.FundPrice}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CustomFullModal>
  );
}
