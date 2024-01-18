import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InfoIcon from "@mui/icons-material/Info";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { IconButton, Paper } from "@mui/material";
import moment from "moment";
import { useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import styles from "./ssiTable.module.css";

function SsiTable({
  data,
  dataIndex,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  modalFunc,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const navigate = useNavigate();

  const payauth = useRef<any>(0);
  const duemonth = useRef<any>(0);
  const flag = useRef<any>("");

  const editpayload = useRef();

  const handleClick = (value: any) => {};
  //console.log(ACTIONS.APPROVEOPEN, "approveopen");

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
                <th className={styles.header}>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row, dataIndex?.index)}
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
                    <span className={styles.flexButtons}>
                      <InfoIcon
                        onClick={() =>
                          dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                        }
                      />
                      <VerifiedUserIcon
                        color="primary"
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.RECONOPEN,
                            payload: row,
                          })
                        }
                      />

                      <SendIcon
                        color="success"
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.SSIAPPROVEOPEN,
                            payload: row,
                          })
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

export default SsiTable;
