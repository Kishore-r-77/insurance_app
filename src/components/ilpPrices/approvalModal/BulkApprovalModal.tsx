import SearchIcon from "@mui/icons-material/Search";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import IlpPriceFullModal from "./IlpPriceFullModal";
import { Table } from "react-bootstrap";
import styles from "./bulkApprovalModal.module.css";
import axios from "axios";

function BulkApprovalModal({
  open,
  handleClose,
  effectiveDate,
  ilpPriceData,
  ilpPriceArray,
  isApprove,
  approvalCheck,
  approvalSave,
  setilpPriceArray,
  seteffectiveDate,
}: any) {
  const title = "ILP Prices Approval";

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    if (e.target.checked) {
      const updateArr = [...ilpPriceArray, value];
      setilpPriceArray(updateArr);
    }
    if (!e.target.checked) {
      console.log(index, "index");
      const updateArr = [...ilpPriceArray];
      const itemIndex = ilpPriceArray.indexOf(value);
      updateArr.splice(itemIndex, 1);
      setilpPriceArray(updateArr);
    }
  };

  console.log(ilpPriceArray, "handleCheck");

  return (
    <div>
      <IlpPriceFullModal
        open={open}
        handleClose={handleClose}
        title={title}
        handleFormSubmit={
          isApprove && ilpPriceData.length !== 0 ? () => approvalSave() : null
        }
      >
        <Grid2 xs={8} md={6} lg={4}>
          <FormControl style={{ marginTop: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={effectiveDate}
                label="Effective Date"
                inputFormat="DD/MM/YYYY"
                onChange={(date: any) => seteffectiveDate(date?.$d)}
                renderInput={(params) => (
                  <TextField {...params} error={false} />
                )}
              />
            </LocalizationProvider>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "1rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
              backgroundColor: "#0a3161",
              marginLeft: "10px",
            }}
            onClick={approvalCheck}
          >
            <SearchIcon />
          </Button>
        </Grid2>
        <br />

        <Paper className={styles.paperStyle}>
          {!isApprove ? (
            <h2 style={{ textAlign: "center", backgroundColor: "#ffcbc7" }}>
              Select the Effective Date for Approval
            </h2>
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
                    {/* <input type="checkbox" /> */}
                  </th>

                  <th>Fund Code</th>
                  <th>Fund Type</th>
                  <th>Fund Date</th>
                  <th>Effective Date</th>
                  <th>Bid Price</th>
                  <th>Offer Price</th>
                  <th>Approval Flag</th>
                </tr>
                {ilpPriceData.map((value: any, index: number) => (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={ilpPriceArray.includes(value)}
                        onChange={(e) => handleCheck(e, value, index)}
                      />
                    </td>
                    <td>{value?.FundCode}</td>
                    <td>{value?.FundType}</td>
                    <td>
                      {value?.FundDate.length === 0
                        ? ""
                        : moment(value?.FundDate).format("DD-MM-YYYY")}
                    </td>
                    <td>
                      {value?.FundDate.length === 0
                        ? ""
                        : moment(value?.FundEffDate).format("DD-MM-YYYY")}
                    </td>

                    <td>{value?.FundBidPrice}</td>
                    <td>{value?.FundOfferPrice}</td>
                    <td>{value?.ApprovalFlag}</td>
                  </tr>
                ))}
              </thead>
            </Table>
          )}
        </Paper>
      </IlpPriceFullModal>
    </div>
  );
}

export default BulkApprovalModal;
