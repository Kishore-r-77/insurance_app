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

function EnquiryTable({
  data,
  columns,
  policyNo,
  infoOpen,
  historyOpen,
  isCommunication,
}: any) {
  console.log(policyNo, "Policy No in Enq");
  const [glEnquiry, setglEnquiry] = useState(false);
  const [GLAcctNo, setGLAcctNo] = useState("");
  const [contAmnt, setcontAmnt] = useState("");
  const infoClickOpen = (value: any, value1: any) => {
    console.log(value, "acct no value");
    setGLAcctNo(value);
    setcontAmnt(value1);
    setglEnquiry(true);
  };

  const handleClickClose = () => {
    setglEnquiry(false);
  };
  console.log(data, "data");

  const [glHistory, setglHistory] = useState(false);
  const [Tranno, setTranno] = useState("");
  const glhClickOpen = (value: any) => {
    console.log(value, "tranno");
    setTranno(value);
    setglHistory(true);
  };

  const glhClickClose = () => {
    setglHistory(false);
  };

  const communicationClickOpen = (value: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/getReport?reportName=RECEIPT&ID=${value}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      )
      .then((resp) => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "RECEIPT.pdf");
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
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr key={row.ID} className={styles["table-cell"]}>
              {columns.map((col: { field: string; type: string }) => {
                if (col.type === "date") {
                  return (
                    <td key={col.field}>
                      {row[col.field] === ""
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
                    ) : (
                      <td key={col.field}>{row[col.field]}</td>
                    )}
                  </>
                );
              })}
              {isCommunication ? (
                <td onClick={() => communicationClickOpen(row.ID)}>
                  <PictureAsPdfIcon />
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
    </Paper>
  );
}

export default EnquiryTable;
