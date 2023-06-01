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
import SAChangeEnquiry from "./SAChangeEnquiry";
import ComponentAddEnquiry from "./ComponentAddEnquiry";
import MRTAEnquiry from "./MRTAEnquiry";

function EnquiryTable({
  data,
  columns,
  policyNo,
  infoOpen,
  historyOpen,
  mrtaOpen,
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
  const [mrta, setmrta] = useState(false);

  const [policyId, setpolicyId] = useState("")
  const [Tranno, setTranno] = useState("");
  const [isSachange, setisSachange] = useState(false);
  const [isComponentAdd, setisComponentAdd] = useState(false);

  const glhClickOpen = (value: any, hcode: any) => {
    console.log(value, "tranno");
    setTranno(value);
    if (hcode === "H0091") {
      console.log(hcode, "History");
      setisSachange(true);
    }else if(hcode === "H0093"){
      setisComponentAdd(true)
    } 
    else {
      setglHistory(true);
    }
  };

  const mrtaClickOpen = (pid: any, tno: any, cov:any) => {
    setpolicyId(pid)
    setTranno(tno);
    if (cov === "MRTA") {
      console.log(cov, "Coverage");
      setmrta(true);
    }
    // else {
    //   setglHistory(true);
    // }
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
                      {row[col.field]?.length === 0
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
                        onClick={() =>
                          glhClickOpen(row?.Tranno, row?.PHistoryCode)
                        }
                      >
                        {row[col.field]}
                      </td>
                    ) : mrtaOpen ? (
                      <td
                        key={col.field}
                        onClick={() =>
                          mrtaClickOpen(row?.PolicyID, row?.Tranno, row?.BCoverage)
                        }
                      >
                        {row[col.field]}
                      </td>
                    ): isCommunication ? (
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
                <td
                  onClick={() =>
                    communicationClickOpen(row.ID, row.TemplateName)
                  }
                >
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
      
    </Paper>
  );
}

export default EnquiryTable;
