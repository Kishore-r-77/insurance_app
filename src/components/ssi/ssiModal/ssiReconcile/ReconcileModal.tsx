import { Paper, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { PaymentsModalType } from "../../../reducerUtilities/types/payments/paymentsTypes";
import Notification from "../../../../utilities/Notification/Notification";
import CustomModal from "../../../../utilities/modal/CustomModal";
// import { getAllApi, paramItem, q0005 } from "../paymentsApis/paymentsApis";
import ReconcileFullModal from "./ReconcileFullModal";
import styles from "./ssiModal.module.css";
import { SsiModalType } from "../../../../reducerUtilities/types/ssi/ssiTypes";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Table } from "react-bootstrap";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import PayerauthModal from "../payerinfo/PayerauthModal";
interface CheckedItems {
  [key: number]: "D" | "N" | "E";
}

function ReconcileModal({ state, record, dispatch, ACTIONS }: SsiModalType) {
  const approvalTitle: string = "SSI Reconciliation";
  const size: string = "xl";
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // payerinfo opening

  const [payerinfo, setpayerinfo] = useState(false);

  const payerinfoOpen = () => {
    setpayerinfo(true);
  };
  const payerinfoClose = () => {
    setpayerinfo(false);
  };

  // handle checkbox function
  const [checkboxStates, setCheckboxStates] = useState<any>([]);

  const handleCheckboxClick = (uniqueId: number) => {
    setCheckboxStates((prev: any) => {
      const updatedStates = { ...prev };
      const currentState = updatedStates[uniqueId];

      switch (currentState) {
        case "D":
          updatedStates[uniqueId] = "N";
          break;
        case "N":
          updatedStates[uniqueId] = "E";
          break;
        default:
          updatedStates[uniqueId] = "D";
          break;
      }
      return updatedStates;
    });
  };

  // handle the change Function
  const [remarksValues, setRemarksValues] = useState<string[]>([]);

  const handleRemarksChange = (index: number, value: string) => {
    setRemarksValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
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

  const [pabill, setPabill] = useState<any>([]);

  const getPolBill = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/getpollbill`,
        {
          CompanyID: record.CompanyID,
          PayingAuthority: record.PayingAuthorityID,
          PaBillDueMonth: record.PaBillDueMonth,
          ProcessFlag: record.PaBillStatus,
          Seqno: record.PaBillSeqNo,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setPabill(resp.data?.PollBill);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.RECONCLOSE });
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  useEffect(() => {
    setPabill([]);

    return () => {};
  }, [state.reconOpen === false]);

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

  const reconcileApi = () => {
    return axios
      .post(
        `http://localhost:3000/api/v1/nbservices/reconpabill`,
        {
          ID: record.ID,
          CompanyID: record.CompanyID,
          PayingAuthority: record.PayingAuthorityID,
          PaBillDueMonth: record.PaBillDueMonth,
          ProcessFlag: record.PaBillStatus,
          Seqno: record.PaBillSeqNo,
          Notes: notesupdate,
          PollBill: pabill.map((pollbill: any, index: number) => ({
            ...pollbill,
            ID: +pollbill.ID,
            PolicyID: +pollbill?.PolicyNo,
            PaidToDate: moment(pollbill?.DueDate).format("YYYYMMDD"),
            InstalmentPrem: +pollbill?.Premium,
            ProcessFlag: checkboxStates[index], // Use checkbox state directly
            Remarks: remarksValues[index],
          })),
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        dispatch({ type: ACTIONS.RECONCLOSE });
        setNotify({
          isOpen: true,
          message: `Fully Reconciled`,
          type: "success",
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.RECONCLOSE });
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const [regFlag, setRegFlag] = useState<any>({});

  const fetchData = async () => {
    if (state.reconOpen) {
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

  // Notes handle change
  const [notesupdate, setnotesupdate] = useState<any>(pabillsum.Notes);

  const handlenotechnge = (e: any) => {
    setnotesupdate(e.target.value);
  };

  useEffect(() => {
    setnotesupdate(pabillsum.Notes);
  }, [pabillsum.Notes, state.reconOpen]);

  useEffect(() => {
    setpabillsum((prevPabillsum: any) => ({
      ...prevPabillsum,
      DeductedCount: Object.values(checkboxStates).filter(
        (state) => state === "D"
      ).length,
    }));
  }, [checkboxStates]);
  useEffect(() => {
    setpabillsum((prevPabillsum: any) => ({
      ...prevPabillsum,
      NotDeductedCount: Object.values(checkboxStates).filter(
        (state) => state === "N"
      ).length,
    }));
  }, [checkboxStates]);

  useEffect(() => {
    setpabillsum((prevPabillsum: any) => ({
      ...prevPabillsum,
      UnReconciledCount: Object.values(checkboxStates).filter(
        (state) => state === "E"
      ).length,
    }));
  }, [checkboxStates]);

  // check box count managed start

  useEffect(() => {
    const deductedAmount = pabill.reduce(
      (sum: any, item: { Premium: any }, index: string | number) => {
        return checkboxStates[index] === "D" ? sum + item.Premium : sum;
      },
      0
    );

    setpabillsum((prevPabillsum: any) => ({
      ...prevPabillsum,
      DeductedAmount: deductedAmount,
    }));
  }, [checkboxStates, pabill]);

  useEffect(() => {
    const notdeductedamount = pabill.reduce(
      (sum: any, item: { Premium: any }, index: string | number) => {
        return checkboxStates[index] === "N" ? sum + item.Premium : sum;
      },
      0
    );

    setpabillsum((prevPabillsum: any) => ({
      ...prevPabillsum,
      NotDeductedAmount: notdeductedamount,
    }));
  }, [checkboxStates, pabill]);

  useEffect(() => {
    const unreconciledAmount = pabill.reduce(
      (sum: any, item: { Premium: any }, index: string | number) => {
        return checkboxStates[index] === "E" ? sum + item.Premium : sum;
      },
      0
    );

    setpabillsum((prevPabillsum: any) => ({
      ...prevPabillsum,
      UnReconciledAmount: unreconciledAmount,
    }));
  }, [checkboxStates, pabill]);
  //

  useEffect(() => {
    setRegFlag(pabill.map((val: any) => val.Reconflag));
  }, [pabill]);

  useEffect(() => {
    getPolBill();
    return () => {};
  }, [state.reconOpen]);

  useEffect(() => {
    fetchData();
  }, [state.reconOpen, regFlag]);

  useEffect(() => {
    getPaBillSummary();
    getgabal();
    return () => {};
  }, [state.reconOpen]);

  return (
    <div className={styles.modal}>
      <ReconcileFullModal
        size={size}
        open={state.reconOpen}
        handleClose={
          state.reconOpen
            ? () => dispatch({ type: ACTIONS.APPROVECLOSE })
            : null
        }
        title={approvalTitle}
        ACTIONS={ACTIONS}
        handleApproveSubmit={reconcileApi}
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
                  : moment(pabillsum.DueDate).format("DD/MM/YYYY")}
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
            style={{ margin: "5px" }}
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
                              onChange={() => handleCheckboxClick(index)}
                              ref={(input) => {
                                if (input) {
                                  input.indeterminate =
                                    checkboxStates[index] === "N";
                                }
                              }}
                            />
                          </td>
                          <td className={styles["td-class"]}>
                            <input
                              className={styles["input-form"]}
                              type="text"
                              style={{ width: "100%" }}
                              // value={state.infoOpen ? val?.Remarks : undefined}
                              onChange={(e) =>
                                handleRemarksChange(index, e.target.value)
                              }
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
                  label="Notes"
                  variant="outlined"
                  value={notesupdate}
                  fullWidth
                  onChange={handlenotechnge}
                  rows={2}
                  // inputProps={{ readOnly: state.infoOpen }}
                  InputLabelProps={{ shrink: true }}
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
      </ReconcileFullModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default ReconcileModal;
