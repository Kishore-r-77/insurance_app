import { Paper } from "@mui/material";
import moment from "moment";
import Table from "react-bootstrap/Table";
import styles from "./enquiryTable.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import GLAccountEnquiry from "./GLAccountEnquiry";
import GLHistoryEnquiry from "./GLHistoryEnquiry";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import ILPTransactionEnquiry from "./ILPTransactionEnquiry";
import BenefitFundEnquiry from "./BenefitFundEnquiry";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function EnquiryTable({
  data,
  columns,
  policyNo,
  infoOpen,
  historyOpen,
  ilpTOpen,
  benOpen,
  isCommunication,
}: any) {
  const [glEnquiry, setglEnquiry] = useState(false);
  const [GLAcctNo, setGLAcctNo] = useState("");
  const [contAmnt, setcontAmnt] = useState("");
  const [fund, setfund] = useState("");
  const infoClickOpen = (value: any, value1: any) => {
    setGLAcctNo(value);
    setcontAmnt(value1);
    setglEnquiry(true);
  };

  const ilptClickOpen = (fcode: any) => {
    setfund(fcode);
    setilpT(true);
  };

  const handleClickClose = () => {
    setglEnquiry(false);
  };

  const [glHistory, setglHistory] = useState(false);
  const [ilpT, setilpT] = useState(false);
  const [Tranno, setTranno] = useState("");
  const glhClickOpen = (value: any) => {
    setTranno(value);
    setglHistory(true);
  };

  const glhClickClose = () => {
    setglHistory(false);
  };

  const ilptClickClose = () => {
    setilpT(false);
  };

  const [fundOpen, setfundOpen] = useState(false);
  const fundClickOpen = (benid: any) => {
    setfundOpen(true);
    getFundsByBen(benid);
  };

  const fundClickClose = () => {
    setfundOpen(false);
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
      .catch((err) => console.log(err.message));
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
      .catch((err) => console.log(err.message));
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
            {benOpen ? <th>ILP Fund</th> : null}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr key={row.ID} className={styles["table-cell"]}>
              {columns.map((col: { field: string; type: string }) => {
                if (col.type === "date") {
                  return (
                    <td key={col.field}>
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
                    ) : historyOpen ? (
                      <td
                        key={col.field}
                        onClick={() => glhClickOpen(row?.Tranno)}
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
                        {row[col.field]}
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
              {benOpen ? (
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

      <BenefitFundEnquiry
        open={fundOpen}
        handleClose={fundClickClose}
        policyNo={policyNo}
        fundBenefitData={fundBenefitData}
      />

      <ILPTransactionEnquiry
        open={ilpT}
        handleClose={ilptClickClose}
        policyNo={policyNo}
        fundCode={fund}
      />
    </Paper>
  );
}

export default EnquiryTable;
