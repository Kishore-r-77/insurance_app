import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InfoIcon from "@mui/icons-material/Info";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Paper, Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import BenefitFundEnquiry from "./BenefitFundEnquiry";
import BenefitInfo from "./BenefitInfo";
import ComponentAddEnquiry from "./ComponentAddEnquiry";
import GLAccountEnquiry from "./GLAccountEnquiry";
import GLHistoryEnquiry from "./GLHistoryEnquiry";
import ILPTransactionEnquiry from "./ILPTransactionEnquiry";
import MRTAEnquiry from "./MRTAEnquiry";
import SAChangeEnquiry from "./SAChangeEnquiry";
import styles from "./enquiryTable.module.css";
import FundSwitchEnquiry from "./fundSwitch/FundSwitchEnquiry";

function EnquiryTable({
  data,
  columns,
  policyNo,
  infoOpen,
  historyOpen,
  mrtaOpen,
  benOpen,
  ilpTOpen,
  isCommunication,
}: any) {
  const [glEnquiry, setglEnquiry] = useState(false);
  const [GLAcctNo, setGLAcctNo] = useState("");
  const [contAmnt, setcontAmnt] = useState("");
  const infoClickOpen = (value: any, value1: any) => {
    setGLAcctNo(value);
    setcontAmnt(value1);
    setglEnquiry(true);
  };

  const handleClickClose = () => {
    setglEnquiry(false);
  };

  const [glHistory, setglHistory] = useState(false);
  const [isFundSwitch, setisFundSwitch] = useState(false);
  const [mrta, setmrta] = useState(false);
  const [ilpT, setilpT] = useState(false);

  const [policyId, setpolicyId] = useState("");
  const [Tranno, setTranno] = useState("");
  const [fund, setfund] = useState("");
  const [isSachange, setisSachange] = useState(false);
  const [isComponentAdd, setisComponentAdd] = useState(false);

  const glhClickOpen = (value: any, hcode: any) => {
    setTranno(value);
    if (hcode === "H0091") {
      setisSachange(true);
    } else if (hcode === "H0093") {
      setisComponentAdd(true);
    } else if (hcode === "H0139") {
      fundSwitchOpen();
      getFundSwitchInfo(policyNo, value);
    } else if (hcode === "B0101") {
      fundSwitchOpen();
      getFundSwitchInfo(policyNo, value);
    } else {
      setglHistory(true);
    }
  };

  const fundSwitchOpen = () => {
    setisFundSwitch(true);
  };
  const fundSwitchClose = () => {
    setisFundSwitch(false);
  };

  const ilptClickOpen = (fcode: any) => {
    setfund(fcode);
    setilpT(true);
  };

  const [fundOpen, setfundOpen] = useState(false);
  const fundClickOpen = (benid: any) => {
    setfundOpen(true);
    getFundsByBen(benid);
  };

  const fundClickClose = () => {
    setfundOpen(false);
  };

  const [benInfoOpen, setbenInfoOpen] = useState(false);
  const [benRecord, setbenRecord] = useState({});
  const benInfoClickOpen = (row: any) => {
    setbenInfoOpen(true);
    setbenRecord(row);
  };

  const benInfoClickClose = () => {
    setbenInfoOpen(false);
  };

  const mrtaClickOpen = (pid: any, tno: any, cov: any) => {
    setpolicyId(pid);
    setTranno(tno);
    if (cov === "MRTA") {
      setmrta(true);
    }
  };

  const isSAChangeClose = () => {
    setisSachange(false);
  };

  const isComponentAddClose = () => {
    setisComponentAdd(false);
  };

  const glhClickClose = () => {
    setglHistory(false);
  };

  const ilptClickClose = () => {
    setilpT(false);
  };

  const mrtaClickClose = () => {
    setmrta(false);
  };

  const communicationClickOpen = (Id: any, temp: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/getReport?reportName=${temp}&ID=${Id}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      )
      .then((resp) => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${temp}.pdf`);
        link.click();
      })
      .catch((err) => err.message);
  };

  const [fundswitchData, setfundswitchData] = useState([]);

  const getFundSwitchInfo = (policyId: number, tranno: number) => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/ilpswitchenq/${policyId}/${tranno}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setfundswitchData(resp?.data?.ilpFundSwitchDetail);
      })
      .catch((err) => err.message);
  };

  function downloadReceiptPdf(val: any) {
    axios({
      url: `http://localhost:3000/api/v1/basicservices/getReport?reportName=RECEIPT&ID=${val}`,
      method: "GET",
      responseType: "blob",
      headers: {
        withCredentials: true,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RECEIPT.pdf");
      link.click();
    });
  }

  const [fundBenefitData, setfundBenefitData] = useState([]);
  const getFundsByBen = (id: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/ilpfundbypolandben/${policyNo}/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setfundBenefitData(resp.data["Ilp Funds"]);
      })
      .catch((err) => err.message);
  };

  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns?.map(
              (
                column: {
                  field: string;
                  header: string;
                  dbField: string;
                  sortable: boolean;
                },
                index: number
              ) => (
                <th key={column.dbField}>{column.header}</th>
              )
            )}
            {isCommunication ? <th>PDF</th> : null}
            {benOpen && data[0]?.BCoverage == "ILP1" ? <th>ILP Fund</th> : null}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr key={row.ID} className={styles["table-cell"]}>
              {columns.map((col: { field: string; type: string }) => {
                if (col.type === "date") {
                  return (
                    <td
                      key={col.field}
                      style={{
                        textDecoration:
                          row.IsReversed && historyOpen
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {row[col.field].length === 0
                        ? ""
                        : moment(row[col.field]).format("DD-MM-YYYY")}
                    </td>
                  );
                }
                return (
                  <>
                    {infoOpen ? (
                      <td
                        key={col.field}
                        onClick={() =>
                          infoClickOpen(row?.GlAccountno, row?.ContractAmount)
                        }
                      >
                        {row[col.field]}
                      </td>
                    ) : benOpen ? (
                      <td key={col.field} onClick={() => benInfoClickOpen(row)}>
                        {row[col.field]}
                      </td>
                    ) : historyOpen ? (
                      <td
                        key={col.field}
                        onClick={() =>
                          glhClickOpen(row?.Tranno, row?.PHistoryCode)
                        }
                      >
                        <span
                          style={{
                            textDecoration: row.IsReversed
                              ? "line-through"
                              : "none",
                            marginRight: "1.5rem",
                          }}
                        >
                          {row[col.field]}{" "}
                        </span>
                        {col.field === "Tranno" && row.IsReversed && (
                          <Tooltip
                            title={
                              "Reversed by " +
                              row.ReversedUser +
                              " on " +
                              row.ReversedAt +
                              "  Remarks: " +
                              row.RevRemark
                            }
                          >
                            <InfoIcon />
                          </Tooltip>
                        )}
                      </td>
                    ) : mrtaOpen ? (
                      <td
                        key={col.field}
                        onClick={() =>
                          mrtaClickOpen(
                            row?.PolicyID,
                            row?.Tranno,
                            row?.BCoverage
                          )
                        }
                      >
                        {row[col.field]}
                      </td>
                    ) : isCommunication ? (
                      <td
                        key={col.field}
                        onClick={() => downloadReceiptPdf(row?.ID)}
                      >
                        {row[col.field]}
                      </td>
                    ) : ilpTOpen ? (
                      <td
                        key={col.field}
                        onClick={() => ilptClickOpen(row?.FundCode)}
                      >
                        <span
                          style={{
                            textDecoration:
                              row?.DeletedAt != null ? "line-through" : "none",
                            marginRight: "1.5rem",
                            display: "inline-block", // Ensures the span behaves like a block-level element
                          }}
                        >
                          {row[col.field]}
                        </span>
                      </td>
                    ) : (
                      <td key={col.field}>{row[col.field]}</td>
                    )}
                  </>
                );
              })}
              {isCommunication ? (
                <td
                  onClick={() =>
                    communicationClickOpen(row.ID, row.TemplateName)
                  }
                >
                  <PictureAsPdfIcon />
                </td>
              ) : null}

              {benOpen && data[0]?.BCoverage == "ILP1" ? (
                <td onClick={() => fundClickOpen(row.ID)}>
                  <AccountBalanceWalletIcon color="success" />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>

      <GLAccountEnquiry
        open={glEnquiry}
        handleClose={handleClickClose}
        policyNo={policyNo}
        GLAccountNo={GLAcctNo}
        contractAmnt={contAmnt}
      />

      <GLHistoryEnquiry
        open={glHistory}
        handleClose={glhClickClose}
        policyNo={policyNo}
        TransactionNo={Tranno}
      />

      <SAChangeEnquiry
        open={isSachange}
        handleClose={isSAChangeClose}
        policyNo={policyNo}
        TransactionNo={Tranno}
      />

      <ComponentAddEnquiry
        open={isComponentAdd}
        handleClose={isComponentAddClose}
        policyNo={policyNo}
        TransactionNo={Tranno}
      />

      <MRTAEnquiry
        open={mrta}
        handleClose={mrtaClickClose}
        policyNo={policyNo}
        TransactionNo={Tranno}
      />

      <BenefitFundEnquiry
        open={fundOpen}
        handleClose={fundClickClose}
        policyNo={policyNo}
        fundBenefitData={fundBenefitData}
      />

      <BenefitInfo
        open={benInfoOpen}
        handleClose={benInfoClickClose}
        record={benRecord}
      />

      <ILPTransactionEnquiry
        open={ilpT}
        handleClose={ilptClickClose}
        policyNo={policyNo}
        fundCode={fund}
      />
      <FundSwitchEnquiry
        fundswitchData={fundswitchData}
        open={isFundSwitch}
        handleClose={fundSwitchClose}
        policyNo={policyNo}
        Tranno={Tranno}
      />
    </Paper>
  );
}

export default EnquiryTable;
