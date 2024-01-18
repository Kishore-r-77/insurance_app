import { FormControl, MenuItem, Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { PaymentsModalType } from "../../../reducerUtilities/types/payments/paymentsTypes";
import { useAppSelector } from "../../../../redux/app/hooks";
import Notification from "../../../../utilities/Notification/Notification";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import Address from "../../../clientDetails/address/Address";
import Client from "../../../clientDetails/client/Client";
import Policy from "../../../policy/Policy";
import {
  getPoliciesByClient,
  getPolicyApi,
} from "../../../policy/policyApis/policyApis";
// import { getAllApi, paramItem, q0005 } from "../paymentsApis/paymentsApis";

import styles from "./ssiApproveModal.module.css";
import { SsiModalType } from "../../../../reducerUtilities/types/ssi/ssiTypes";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Table } from "react-bootstrap";
import moment from "moment";
import SsiApproveFullModal from "./SsiApproveFullModal";

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

  const handleCheckboxClick = (index: number) => {
    setCheckboxStates((prev) => {
      const updatedStates = { ...prev };
      const currentState = updatedStates[index];

      switch (currentState) {
        case "D":
          updatedStates[index] = "N";
          break;
        case "N":
          updatedStates[index] = "P";
          break;
        default:
          updatedStates[index] = "D";
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
        console.error(err);
      });
  };

  useEffect(() => {
    getPolBill();
    return () => {};
  }, [state.ssiapproveOpen]);

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

  const [regFlag, setRegFlag] = useState<any>({});

  useEffect(() => {
    setRegFlag(pabill.map((val: any) => val.Reconflag));
  }, [pabill]);

  const fetchData = async () => {
    if (state.ssiapproveOpen) {
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

  useEffect(() => {
    fetchData();
  }, [state.ssiapproveOpen, regFlag]);

  useEffect(() => {
    getPaBillSummary();

    return () => {};
  }, [state.reconOpen]);

  return (
    <div className={styles.modal}>
      <SsiApproveFullModal
        size={size}
        open={state.ssiapproveOpen}
        handleClose={
          state.ssiapproveOpen
            ? () => dispatch({ type: ACTIONS.SSIAPPROVECLOSE })
            : null
        }
        title={approvalTitle}
        ACTIONS={ACTIONS}
        handleApproveSubmit={ssiapprovalapi}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1"]}
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
                  : moment(pabillsum.DueDate).format("DD/MM/YYYY")}
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
            </div>
          </TreeItem>
          <TreeItem nodeId="1" label={`Ssi Approval Table`}>
            <Paper className={styles.paperStyle}>
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
                    <th style={{ width: "100%" }}>ClientLongName</th>
                    <th style={{ width: "100%" }}>ClientShortName</th>
                    <th style={{ width: "100%" }}>DueDate</th>
                    <th style={{ width: "100%" }}>ID</th>
                    <th style={{ width: "100%" }}>National ID</th>
                    <th style={{ width: "100%" }}>Policy No</th>
                    <th style={{ width: "100%" }}>Premium</th>
                    <th style={{ width: "100%" }}>ReconFlag</th>
                    <th style={{ width: "100%" }}>CheckBox</th>
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
                            value={val?.ClientLongName}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val.ClientShortName}
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
                            value={val?.ID}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.NationalId}
                          />
                        </td>
                        {/* <td>
                                                <input
                                                    className={styles["input-form"]}
                                                    style={{
                                                        position: "sticky",
                                                        left: 0,
                                                    }}
                                                    type="checkbox"
                                                    name="Select"
                                                    //onChange={handleCheckboxClick}
                                                />
                                            </td> */}
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
                            value={val?.Premium}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.Reconflag}
                          />
                        </td>

                        <td>
                          <input
                            className={styles["input-form"]}
                            style={{
                              position: "sticky",
                              left: 0,
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
                            value={val?.Remarks}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
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
            </Paper>
          </TreeItem>
        </TreeView>
      </SsiApproveFullModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default SsiApproveModal;
