import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Paper } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./clientTable.module.css";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WorkIcon from "@mui/icons-material/Work";

function ClientTable({
  data,
  dataIndex,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  hardDelete,
  modalFunc,
  showReceipt,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

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
                  {column?.sortable && (
                    <span>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "asc",
                          });

                          return dispatch({
                            type: ACTIONS.SORT_ASC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowUpwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "asc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "desc",
                          });

                          dispatch({
                            type: ACTIONS.SORT_DESC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowDownwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "desc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                    </span>
                  )}
                </th>
              )
            )}
            {modalFunc ? null : (
              <>
                <th className={styles.header}>Client Work</th>
                <th className={styles.header}>Address</th>
                <th className={styles.header}>Receipt</th>
                <th className={styles.header}>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row, dataIndex)}
              key={row.ID}
              className={styles["table-cell"]}
            >
              {columns.map((col: { field: string; type: string }) => {
                if (col.type === "date") {
                  return (
                    <td key={col.field}>
                      {moment(row[col.field]).format("DD-MM-YYYY")}
                    </td>
                  );
                }
                return <td key={col.field}>{row[col.field]}</td>;
              })}
              {modalFunc ? null : (
                <>
                  <td>
                    <WorkIcon
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.CLIENTWORKOPEN,
                          payload: row,
                        })
                      }
                    />
                  </td>
                  <td>
                    <BusinessIcon
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.ADDRESSOPEN,
                          payload: row,
                        })
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    {showReceipt && (
                      <ReceiptLongIcon
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.RECEIPTOPEN,
                            payload: row,
                          })
                        }
                      />
                    )}
                  </td>
                  <td>
                    <span className={styles.flexButtons}>
                      <EditIcon
                        color="primary"
                        onClick={() =>
                          dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => hardDelete(row.ID)}
                      />
                      <InfoIcon
                        onClick={() =>
                          dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                        }
                      />
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default ClientTable;
