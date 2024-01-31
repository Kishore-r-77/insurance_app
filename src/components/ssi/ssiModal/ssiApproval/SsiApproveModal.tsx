import { Paper, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { PaymentsModalType } from "../../../reducerUtilities/types/payments/paymentsTypes";
import Notification from "../../../../utilities/Notification/Notification";
import CustomModal from "../../../../utilities/modal/CustomModal";
import InfoIcon from "@mui/icons-material/Info";

import styles from "./ssiApproveModal.module.css";
import { SsiModalType } from "../../../../reducerUtilities/types/ssi/ssiTypes";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Table } from "react-bootstrap";
import moment from "moment";
import SsiApproveFullModal from "./SsiApproveFullModal";
import PayerauthModal from "../payerinfo/PayerauthModal";

interface CheckedItems {
  [key: number]: "D" | "N" | "P";
}

function SsiApproveModal({ state, record, dispatch, ACTIONS }: SsiModalType) {
  const approvalTitle: string = "Ssi Approval";
  const size: string = "xl";
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // handle checkbox function
  const [checkboxStates, setCheckboxStates] = useState<CheckedItems>([]);

  // handle the change Function
  const [remarksValues, setRemarksValues] = useState<string[]>([]);

  const handleRemarksChange = (index: number, value: string) => {
    setRemarksValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const [pabill, setPabill] = useState<any>([]);

  const getPolBill = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/getpollbill`,
        {
          CompanyID: record.CompanyID,
          PayingAuthority: record.PayingAuthorityID,
          PaBillDueMonth: record.PaBillDueMonth,
          ProcessFlag: record.ProcessFlag,
          Seqno: record.PaBillSeqNo,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setPabill(resp.data?.PollBill);
        console.log(resp.data);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.SSIAPPROVECLOSE });
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const [pabillsum, setpabillsum] = useState<any>({});
  const getPaBillSummary = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/getpollbillsumm`,
        {
          CompanyID: record.CompanyID,
          PayingAuthority: record.PayingAuthorityID,
          PaBillDueMonth: record.PaBillDueMonth,
          Seqno: record.PaBillSeqNo,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setpabillsum(resp.data?.PaBillSummary);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const ssiapprovalapi = () => {
    return axios
      .post(
        `http://localhost:3000/api/v1/nbservices/approvepabill`,
        {
          ID: record.ID,
          CompanyID: record.CompanyID,
          PayingAuthority: record.PayingAuthorityID,
          PaBillDueMonth: record.PaBillDueMonth,
          ProcessFlag: "R",
          Seqno: record.PaBillSeqNo,
          PollBill: pabill.map((pollbill: any, index: number) => ({
            ...pollbill,
            ID: +pollbill.ID,
            PolicyID: +pollbill?.PolicyNo,
            PaidToDate: moment(pollbill?.DueDate).format("YYYYMMDD"),
            //InstalmentPrem: +pollbill?.Premium,
            ProcessFlag: checkboxStates[index],
            Remarks: remarksValues[index],
          })),
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        dispatch({ type: ACTIONS.SSIAPPROVECLOSE });
        setNotify({
          isOpen: true,
          message: `Approved`,
          type: "success",
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.SSIAPPROVECLOSE });
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const [glbla, setglbla] = useState<any>([0]);
  const getgabal = () => {
    return axios
      .get(
        `http://localhost:3000/api/v1/nbservices/glbalget/${record.PayingAuthorityID}`,
        {
          withCredentials: true,
          params: {
            pageSize: 1,
            searchString: "PaDeposit",
            searchCriteria: "gl_accountno",
          },
        }
      )
      .then((resp) => {
        setglbla(resp.data?.History);
      });
  };

  const [regFlag, setRegFlag] = useState<any>({});

  useEffect(() => {
    setRegFlag(pabill.map((val: any) => val.Reconflag));
  }, [pabill]);

  const fetchData = async () => {
    if (state.ssiapproveOpen || state.infoOpen) {
      // Initialize checkbox states based on regFlag
      setCheckboxStates(
        regFlag.reduce(
          (acc: { [x: string]: any }, val: any, index: string | number) => {
            acc[index] = val;
            return acc;
          },
          {} as CheckedItems
        )
      );
    }
  };
  const [payerinfo, setpayerinfo] = useState(false);

  const payerinfoOpen = () => {
    setpayerinfo(true);
  };
  const payerinfoClose = () => {
    setpayerinfo(false);
  };
  useEffect(() => {
    getPolBill();
    return () => {};
  }, [state.ssiapproveOpen || state.infoOpen]);

  useEffect(() => {
    fetchData();
  }, [state.ssiapproveOpen || state.infoOpen, regFlag]);

  useEffect(() => {
    getPaBillSummary();
    getgabal();

    return () => {};
  }, [state.ssiapproveOpen || state.infoOpen]);

  useEffect(() => {
    setPabill([]);

    return () => {};
  }, [state.ssiapproveOpen === false]);

  return (
    <div className={styles.modal}>
      <SsiApproveFullModal
        size={size}
        open={state.ssiapproveOpen || state.infoOpen}
        handleClose={
          state.ssiapproveOpen
            ? () => dispatch({ type: ACTIONS.SSIAPPROVECLOSE })
            : state.infoOpen
            ? () => dispatch({ type: ACTIONS.INFOCLOSE })
            : null
        }
        title={approvalTitle}
        ACTIONS={ACTIONS}
        handleApproveSubmit={ssiapprovalapi}
        state={state}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1", "2"]}
        >
          <TreeItem
            nodeId="1"
            label={`Paying Authority-${pabillsum.PayingAuthorityID}-${pabillsum.PaName}`}
          >
            <div className={styles.treeItemContainer}>
              <div className={styles.treeItemContent}>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Extracted Count</span>:{" "}
                  {pabillsum.ExtractedCount}
                </li>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Extracted Amount</span>:{" "}
                  {pabillsum.ExtractedAmount}
                </li>
              </div>
              <div className={styles.treeItemContent}>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Deducted Count</span>:{" "}
                  {pabillsum.DeductedCount}
                </li>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Deducted Amout</span>:{" "}
                  {pabillsum.DeductedAmount}
                </li>
              </div>
              <div className={styles.treeItemContent}>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Not Deducted Count</span>:{" "}
                  {pabillsum.NotDeductedCount}
                </li>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Not Deducted Amount</span>:{" "}
                  {pabillsum.NotDeductedAmount}
                </li>
              </div>
              <div className={styles.treeItemContent}>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Un Reconciled Count</span>:{" "}
                  {pabillsum.UnReconciledCount}
                </li>
                <li className={styles.treeItem}>
                  <span className={styles.label}>Un Reconciled Amount</span>:{" "}
                  {pabillsum.UnReconciledAmount}
                </li>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontFamily: "MerriWeather",
                marginTop: "15px",
              }}
            >
              <div style={{ marginRight: "100px" }}>
                Reconciled Date :
                {pabillsum.ReconciledDate === ""
                  ? ""
                  : moment(pabillsum.ReconciledDate).format("DD/MM/YYYY")}
              </div>
              <div style={{ marginRight: "100px" }}>
                Reconciled By :{pabillsum.ReconciledBy}
              </div>
              <div style={{ marginRight: "100px" }}>
                Approved Date :
                {pabillsum.ApprovedDate === ""
                  ? ""
                  : moment(pabillsum.ApprovedDate).format("DD/MM/YYYY")}
              </div>
              <div style={{ marginRight: "100px" }}>
                Approved By :{pabillsum.ApprovedBy}
              </div>
              <div style={{ marginRight: "100px" }}>
                Available Deposit :
                {glbla.map((item: any) => (
                  <span key={item.ID}>{item.ContractAmount}</span>
                ))}
              </div>
              <div>
                <span className={styles.flexButtons}>
                  <InfoIcon onClick={() => payerinfoOpen()} />
                </span>
              </div>
            </div>
          </TreeItem>
          <TreeItem
            nodeId="2"
            label={`List of Policies`}
            style={{ margin: "20px" }}
          >
            <Paper className={styles.paperStyle}>
              <div style={{ height: "250px", overflowY: "auto" }}>
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
                      <th style={{ width: "50%" }}>ID</th>
                      <th style={{ width: "100%" }}>Policy No</th>
                      <th style={{ width: "100%" }}>Name</th>
                      <th style={{ width: "100%" }}>Emp Id</th>
                      <th style={{ width: "100%" }}>Emp Designation</th>
                      <th style={{ width: "120%" }}>Department & Location</th>
                      <th style={{ width: "100%" }}>DueDate</th>
                      <th style={{ width: "120%" }}>Premium Amount</th>
                      <th style={{ width: "100%" }}>Reconcile</th>
                      <th style={{ width: "100%" }}>Remarks</th>
                    </tr>
                  </thead>
                  {pabill?.map((val: any, index: number) => {
                    return (
                      <>
                        <CustomModal size="xl"></CustomModal>
                        <tr>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.ID}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.PolicyNo}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val.ClientName}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.PayRollNumber}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.Designation}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.DepLocation}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={moment(val?.DueDate).format("DD-MM-YYYY")}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              disabled
                              value={val?.Premium}
                            />
                          </td>
                          <td>
                            <input
                              className={styles["input-form"]}
                              style={{
                                // width: "100%",
                                margin: "auto",
                                display: "block",
                              }}
                              type="checkbox"
                              name={`Select-${index}`}
                              checked={checkboxStates[index] === "D"}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              style={{ width: "100%" }}
                              value={val?.Remarks}
                              disabled={state.ssiapproveOpen}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </Table>
              </div>
              <div style={{ width: "30%", marginLeft: "auto" }}>
                <TextField
                  variant="outlined"
                  placeholder="Notes"
                  value={pabillsum.Notes}
                  label="Notes"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  rows={2}
                  inputProps={{
                    readOnly: state.ssiapproveOpen || state.infoOpen,
                  }}
                />
              </div>
              <PayerauthModal
                open={payerinfo}
                handleClose={payerinfoClose}
                record={record}
              />
            </Paper>
          </TreeItem>
        </TreeView>
      </SsiApproveFullModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default SsiApproveModal;
