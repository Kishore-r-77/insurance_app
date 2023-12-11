import { Paper } from "@mui/material";
import moment from "moment";
import Table from "react-bootstrap/Table";
import styles from "./tranReversalTable.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { IconButton } from "@mui/material";

function TranReversalTable({ data, columns, tranReversalClick }: any) {
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
            <td className={styles.header}>Action</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any, i: number) => (
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
                    <td key={col.field}>{row[col.field]}</td>
                  </>
                );
              })}
              <td>
                <IconButton disabled={i !== 0} color="primary">
                  <PendingActionsIcon
                    onClick={() => tranReversalClick(row?.Tranno)}
                  />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default TranReversalTable;
