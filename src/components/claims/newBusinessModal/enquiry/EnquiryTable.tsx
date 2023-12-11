import { Paper } from "@mui/material";
import moment from "moment";
import Table from "react-bootstrap/Table";
import styles from "./enquiryTable.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import GLAccountEnquiry from "./GLAccountEnquiry";
import GLHistoryEnquiry from "./GLHistoryEnquiry";

function EnquiryTable({ data, columns, policyNo, infoOpen, historyOpen }: any) {
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
  const [Tranno, setTranno] = useState("");
  const glhClickOpen = (value: any) => {
    setTranno(value);
    setglHistory(true);
  };

  const glhClickClose = () => {
    setglHistory(false);
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
                <th key={column.dbField} className={styles.header}>
                  {column.header}
                </th>
              )
            )}
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
                    ) : (
                      <td key={col.field}>{row[col.field]}</td>
                    )}
                  </>
                );
              })}
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
