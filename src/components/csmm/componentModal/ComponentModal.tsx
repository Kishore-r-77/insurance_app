import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";
import CustomComponentModal from "./CustomComponentModal";
import styles from "./componentModal.module.css";
import CustomModal from "../../../utilities/modal/CustomModal";
import Client from "../../clientDetails/client/Client";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function ComponentModal({
  open,
  handleClose,
  componentData,
  componentBenefits,
  setcomponentBenefits,
  postComponentAdd,
  isSave,
  saveComponent,
  premium,
}: any) {
  const title: string = "Component Add";
  const isChecked = useRef(false);

  const [isClient, setisClient] = useState(false);
  const clientId = useRef<any>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setcomponentBenefits(
      componentBenefits.map((benefits: any, index: number) => {
        if (index === i) {
          return { ...benefits, [name]: value };
        } else return benefits;
      })
    );
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    isChecked.current = e.target.checked;
    setcomponentBenefits(
      componentBenefits.map((benefits: any, index: number) => {
        if (index === i && isChecked.current) {
          return { ...benefits, Select: "X" };
        } else if (index === i && !isChecked.current) {
          return { ...benefits, Select: "" };
        } else return benefits;
      })
    );
  };

  const dataIndex = useRef(0);

  const clientOpen = (clientId: any, index: number) => {
    // clientId.current = clientId;

    dataIndex.current = index;
    setisClient(true);
  };
  const clientClose = () => {
    setisClient(false);
  };

  const clientOpenFunc = (item: any, i: number) => {
    setcomponentBenefits((componentBen: any) =>
      componentBen.map((benefits: any, index: number) => {
        if (i === index) {
          clientId.current = item.ID;
          return { ...benefits, ClientID: item.ID };
        } else return benefits;
      })
    );
    clientClose();
  };

  return (
    <div>
      <CustomComponentModal
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={isSave ? saveComponent : postComponentAdd}
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
                  value={componentData?.CompanyID}
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
                  value={componentData?.PolicyID}
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
                  value={componentData?.Product}
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
                  value={componentData?.Frequency}
                  placeholder="Frequency"
                  label="Frequency"
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
                    isSave ? premium?.current : componentData?.InstalmentPremium
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
                    componentData?.BillToDate === ""
                      ? ""
                      : moment(componentData?.BillToDate).format("DD-MM-YYYY")
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
                    componentData?.PaidToDate === ""
                      ? ""
                      : moment(componentData?.PaidToDate).format("DD-MM-YYYY")
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

                    <th>Policy ID</th>
                    <th>Client ID</th>
                    <th>BCoverage</th>
                    <th>BStart Date</th>
                    <th>BSumAssured</th>
                    <th>BTerm</th>
                    <th>BPTerm</th>
                    <th>BPrem</th>
                    <th>BAnnual Prem</th>
                    <th>BGender</th>
                    <th>BDOB</th>
                    <th>Method</th>
                  </tr>
                </thead>
                {componentBenefits?.map((val: any, index: number) => {
                  // clientId.current = val.ClientID;

                  return (
                    <>
                      <CustomModal
                        size="xl"
                        open={isClient}
                        handleClose={clientClose}
                      >
                        <Client
                          dataIndex={dataIndex.current}
                          modalFunc={clientOpenFunc}
                        />
                      </CustomModal>
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
                            value={val.PolicyID}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <span style={{ display: "flex" }}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              name="ClientID"
                              disabled={val?.Select === ""}
                              style={{
                                backgroundColor:
                                  val.Select === "X" ? "#caccca" : "",
                              }}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, index)}
                              value={
                                // clientId.current !== 0
                                //   ? clientId?.current
                                //   :
                                val.ClientID
                              }
                            />
                            <OpenInNewIcon
                              color={
                                val.Select === "X" ? "primary" : "secondary"
                              }
                              onClick={
                                val.Select === "X"
                                  ? () => clientOpen(val.ClientID, index)
                                  : () => {}
                              }
                            />
                          </span>
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            value={val?.BPrem}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.BAnnualPrem}
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
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.Method}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </Table>
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomComponentModal>
    </div>
  );
}

export default ComponentModal;
