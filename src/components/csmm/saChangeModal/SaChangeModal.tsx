import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";
import React, { useRef } from "react";
import { Table } from "react-bootstrap";
import CustomSaFullModal from "./CustomSaFullModal";
import styles from "./saChangeModal.module.css";

function SaChangeModal({
  open,
  modifiedPremium,
  handleClose,
  saChangeObj,
  saChangeBenefits,
  setsaChangeBenefits,
  postSaChange,
  isSave,
  saveSaChange,
}: any) {
  const title: string = "Sa Change";
  const isChecked = useRef(false);

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

    console.log(e.target.checked, "checked");

    isChecked.current = e.target.checked;
    setsaChangeBenefits(
      saChangeBenefits.map((benefits: any, index: number) => {
        if (index === i && isChecked.current) {
          return { ...benefits, Select: "X" };
        } else if (index === i && !isChecked.current) {
          return { ...benefits, Select: "" };
        } else return benefits;
      })
    );
  };

  return (
    <div>
      <CustomSaFullModal
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={isSave ? saveSaChange : postSaChange}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="InstalmentPremium"
                  name="InstalmentPremium"
                  value={
                    isSave
                      ? modifiedPremium?.current
                      : saChangeObj?.InstalmentPremium
                  }
                  placeholder="Install Premium"
                  label="Install Premium"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
            </Grid2>
          </TreeItem>
          <TreeItem nodeId="2" label={`Benefits`}>
            <Paper className={styles.paperStyle}>
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
                    <th
                      style={{
                        zIndex: -1,
                      }}
                    >
                      BenefitID
                    </th>
                    <th>BCoverage</th>
                    <th>BPTerm</th>
                    <th>BPrem</th>
                    <th>BSumAssured</th>
                    <th>BTerm</th>
                    <th>NPTerm</th>
                    <th>NTerm</th>
                    <th>NSumAssured</th>
                    <th>NPrem</th>
                  </tr>
                </thead>
                {saChangeBenefits?.map((val: any, index: number) => (
                  <tr>
                    <td>
                      <input
                        className={styles["input-form"]}
                        style={{
                          position: "sticky",
                          left: 0,
                        }}
                        type="checkbox"
                        name="Select"
                        defaultChecked={val.Select === "X"}
                        value={val.Select[index]}
                        checked={val?.Select === "X"}
                        onChange={(e) => handleCheck(e, index)}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BenefitID}
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
                        value={val?.BPTerm}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BPrem}
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
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BTerm}
                      />
                    </td>

                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        name="NPTerm"
                        type="number"
                        value={val?.NPTerm}
                        disabled={val?.Select === ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        disabled={val?.Select === ""}
                        name="NTerm"
                        type="number"
                        value={val?.NTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>

                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        name="NSumAssured"
                        type="number"
                        disabled={val?.Select === ""}
                        value={val?.NSumAssured}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        disabled={val?.Select === ""}
                        name="NPrem"
                        type="number"
                        value={val?.NPrem}
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
      </CustomSaFullModal>
    </div>
  );
}

export default SaChangeModal;
