import SearchIcon from "@mui/icons-material/Search";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useState } from "react";
import { Table } from "react-bootstrap";
import IlpPriceFullModal from "./IlpPriceFullModal";
import styles from "./bulkApprovalModal.module.css";
import SelectImage from "../../../assets/images/select-hand.png";

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

  const [selectAll, setSelectAll] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    if (e.target.checked) {
      const updateArr = [...ilpPriceArray, value];
      setilpPriceArray(updateArr);
    }
    if (!e.target.checked) {
      const updateArr = [...ilpPriceArray];
      const itemIndex = ilpPriceArray.indexOf(value);
      updateArr.splice(itemIndex, 1);
      setilpPriceArray(updateArr);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    // Update the ilpPriceArray based on whether "Select All" is checked
    if (isChecked) {
      // Add all values to ilpPriceArray
      setilpPriceArray(ilpPriceData.map((value: any) => value));
    } else {
      // Clear ilpPriceArray
      setilpPriceArray([]);
    }
  };

  return (
    <div style={{ width: "100%" }}>
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
            <>
              <h2
                style={{
                  textAlign: "center",
                  backgroundColor: "#ffcbc7",
                  position: "sticky",
                  top: "10%",
                  minWidth: "100vw",
                }}
              >
                Select the Effective Date for Approval
              </h2>
              <img
                src={SelectImage}
                alt="Image"
                style={{
                  display: "block",
                  margin: "0 auto",
                  opacity: "0.6",
                }}
              />
            </>
          ) : (
            <Table
              striped
              bordered
              hover
              className={styles["custom-table"]}
              style={{
                border: "3px solid black",
                boxShadow: "0px 0px 0px 0px",
              }}
            >
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
                  <th>Fund Type</th>
                  <th>Fund Date</th>
                  <th>Effective Date</th>
                  <th>Bid Price</th>
                  <th>Offer Price</th>
                  <th>Approval Flag</th>
                </tr>
              </thead>
              {ilpPriceData.map((value: any, index: number) => (
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectAll || ilpPriceArray.includes(value)}
                        onChange={(e) => handleCheck(e, value)}
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
                </tbody>
              ))}
            </Table>
          )}
        </Paper>
      </IlpPriceFullModal>
    </div>
  );
}

export default BulkApprovalModal;
