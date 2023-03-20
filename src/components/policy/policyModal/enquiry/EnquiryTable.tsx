import { Paper } from "@mui/material";
import moment from "moment";
import Table from "react-bootstrap/Table";
import styles from "./enquiryTable.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import GLAccountEnquiry from "./GLAccountEnquiry";

function EnquiryTable({ data, columns, policyNo, infoOpen }: any) {
  const [glEnquiry, setglEnquiry] = useState(false);
  const [GLAcctNo, setGLAcctNo] = useState("");
  const infoClickOpen = (value: any) => {
    console.log(value, "acct no value");
    setGLAcctNo(value);
    setglEnquiry(true);
  };

  const handleClickClose = () => {
    setglEnquiry(false);
  };
  console.log(data, "data");
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
                        onClick={() => infoClickOpen(row?.GlAccountno)}
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
      />
    </Paper>
  );
}

export default EnquiryTable;
