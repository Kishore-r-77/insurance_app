import React, { useState } from "react";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, TextField } from "@mui/material";
import moment from "moment";
import styles from "./saChangeModal.module.css";
import { Table } from "react-bootstrap";

function SaChangeModal({
  open,
  handleClose,
  saChangeObj,
  saChangeBenefits,
  setsaChangeBenefits,
  postSaChange,
}: any) {
  const title: string = "Sa Change";
  const [isChecked, setisChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setsaChangeBenefits(
      saChangeBenefits.map((benefits: any, index: number) => {
        if (index === i) {
          return { ...benefits, [name]: parseInt(value) };
        } else return benefits;
      })
    );
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setisChecked(e.target.checked);
    setsaChangeBenefits(
      saChangeBenefits.map((benefits: any, index: number) => {
        if (index === i && isChecked) {
          return { ...benefits, Select: "X" };
        } else if (index === i && !isChecked) {
          return { ...benefits, Select: "" };
        } else return benefits;
      })
    );
  };

  return (
    <div>
      <CustomFullModal
        open={open}
        handleClose={handleClose}
        title={title}
        handleFormSubmit={postSaChange}
      >
        <TreeView
          style={{ width: "90%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1", "2"]}
        >
          <TreeItem nodeId="1" label={`Policies`}>
            <Grid2 container spacing={2}>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="CompanyID"
                  name="CompanyID"
                  value={saChangeObj?.CompanyID}
                  placeholder="Company ID"
                  label="Company ID"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="PolicyID"
                  name="PolicyID"
                  value={saChangeObj?.PolicyID}
                  placeholder="policyId"
                  label="policyId"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="Product"
                  name="Product"
                  value={saChangeObj?.Product}
                  placeholder="Product"
                  label="Product"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="InstalmentPremium"
                  name="InstalmentPremium"
                  value={saChangeObj?.InstalmentPremium}
                  placeholder="Install Premium"
                  label="Install Premium"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="BillToDate"
                  name="BillToDate"
                  value={
                    saChangeObj?.BillToDate === ""
                      ? ""
                      : moment(saChangeObj?.BillToDate).format("DD-MM-YYYY")
                  }
                  placeholder="Bill To Date"
                  label="Bill To Date"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="PaidToDate"
                  name="PaidToDate"
                  value={
                    saChangeObj?.PaidToDate === ""
                      ? ""
                      : moment(saChangeObj?.PaidToDate).format("DD-MM-YYYY")
                  }
                  placeholder="Paid To Date"
                  label="Paid To Date"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
            </Grid2>
          </TreeItem>
          <TreeItem nodeId="2" label={`Benefits`}>
            <Paper className={styles.paperStyle}>
              <Table striped bordered hover>
                <thead className={styles.header}>
                  <tr>
                    <th>Selected</th>
                    <th>BenefitID</th>
                    <th>BCoverage</th>
                    <th>BPTerm</th>
                    <th>BPrem</th>
                    <th>BSumAssured</th>
                    <th>BTerm</th>
                    <th>NPTerm</th>
                    <th>NPrem</th>
                    <th>NSumAssured</th>
                    <th>NTerm</th>
                  </tr>
                </thead>
                {saChangeBenefits?.map((val: any, index: number) => (
                  <tr>
                    <input
                      className={styles["input-form"]}
                      type="checkbox"
                      name="Select"
                      defaultChecked={val.Select === "X"}
                      value={val.Select[index]}
                      checked={val?.Select === "X"}
                      onChange={(e) => handleCheck(e, index)}
                    />
                    <td>
                      <input type="text" disabled value={val?.BenefitID} />
                    </td>
                    <td>
                      <input type="text" disabled value={val?.BCoverage} />
                    </td>
                    <td>
                      <input type="text" disabled value={val?.BPTerm} />
                    </td>
                    <td>
                      <input type="text" disabled value={val?.BPrem} />
                    </td>
                    <td>
                      <input type="text" disabled value={val?.BSumAssured} />
                    </td>
                    <td>
                      <input type="text" disabled value={val?.BTerm} />
                    </td>

                    <td>
                      <input
                        name="NPTerm"
                        type="number"
                        value={val?.NPTerm}
                        disabled={val?.Select === ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                    <td>
                      <input
                        name="NPrem"
                        type="number"
                        value={val?.NPrem}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                    <td>
                      <input
                        name="NSumAssured"
                        type="number"
                        value={val?.NSumAssured}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                    <td>
                      <input
                        name="NTerm"
                        type="number"
                        value={val?.NTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomFullModal>
    </div>
  );
}

export default SaChangeModal;
