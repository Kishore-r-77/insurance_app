import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Paper, Tooltip } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./ilpPricesTable.module.css";

function IlpPricesTable({
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row, dataIndex?.index)}
              key={row.ID}
              style={{
                backgroundColor:
                  row?.ApprovalFlag === "AP" ? "#ccffda" : "#fad4d8",
              }}
            >
              {columns.map((col: { field: string; type: string }) => {
                if (col?.type === "date") {
                  return (
                    <td key={col?.field}>
                      {moment(row[col?.field]).format("DD-MM-YYYY")}
                    </td>
                  );
                }
                return <td key={col?.field}>{row[col?.field]}</td>;
              })}

              <td>
                <span className={styles.flexButtons}>
                  {!!ACTIONS.EDITOPEN && (
                    <>
                      {" "}
                      <Tooltip title="Edit">
                        <IconButton>
                          <EditIcon
                            color="primary"
                            onClick={() =>
                              dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip title="Info">
                    <IconButton
                      onClick={() =>
                        dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                      }
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Approve">
                    <IconButton
                      disabled={row.ApprovalFlag === "AP" ? true : false}
                      onClick={() =>
                        dispatch({ type: ACTIONS.APPROVEOPEN, payload: row })
                      }
                    >
                      <AssignmentTurnedInIcon
                        color={
                          row.ApprovalFlag === "AP" ? "success" : "secondary"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default IlpPricesTable;
