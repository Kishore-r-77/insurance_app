import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { IconButton, Paper } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Notification from "../../utilities/Notification/Notification";
import styles from "./newbussinesstable.module.css";

function NewBussinessTable({
  issueOpen,
  confirmOpen,
  data,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  receiptLookup,
  modalFunc,
  getData,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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
                <th key={column.dbField}>
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
            {receiptLookup ? null : (
              <>
                <th>Benefit</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row)}
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
              {receiptLookup ? null : (
                <td>
                  <BusinessIcon
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.BENEFITOPEN,
                        payload: row,
                      })
                    }
                  />
                </td>
              )}
              {receiptLookup ? null : (
                <>
                  <td>
                    <span className={styles.flexButtons}>
                      <EditIcon
                        color="primary"
                        onClick={() =>
                          dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                        }
                      />
                      <InfoIcon
                        onClick={() =>
                          dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                        }
                      />
                      <VerifiedUserIcon
                        color="primary"
                        onClick={() => confirmOpen(row.ID)}
                      />
                      <SendIcon
                        color="success"
                        onClick={() => issueOpen(row.ID, row.versionId)}
                      />
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <Notification notify={notify} setNotify={setNotify} />
    </Paper>
  );
}

export default NewBussinessTable;
