import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import EditIcon from "@mui/icons-material/Edit";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton, Paper } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import MRTAEnquiry from "../../enquiry/MRTAEnquiry";
import styles from "./benefitTable.module.css";

function BenefitTable({
  data,
  dataIndex,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  modalFunc,
  policyRecord,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const [isMrta, setisMrta] = useState(false);

  const mrtaOpen = () => {
    setisMrta(true);
  };
  const mrtaClose = () => {
    setisMrta(false);
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
            <th className={styles.header}>Actions</th>
            {data[0]?.BCoverage === "MRTA" ? <th>Schedule</th> : ""}
            <th className={styles.header}>Extras</th>
            <th className={styles.header}>Funds</th>
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
              <td>
                <span className={styles.flexButtons}>
                  <EditIcon
                    color="primary"
                    onClick={() =>
                      dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                    }
                  />
                  {/* <DeleteIcon
                    color="error"
                    onClick={() => hardDelete(row.ID)}
                  />
                  <InfoIcon
                    onClick={() =>
                      dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                    }
                  /> */}
                </span>
              </td>
              {data[0]?.BCoverage === "MRTA" ? (
                <td onClick={() => mrtaOpen()}>
                  <EventAvailableIcon color="success" />
                </td>
              ) : (
                ""
              )}
              <td>
                <IconButton
                  onClick={() =>
                    dispatch({ type: ACTIONS.EXTRAOPEN, payload: row })
                  }
                >
                  <PlaylistAddIcon />
                </IconButton>
              </td>

              <td>
                <IconButton
                  onClick={() =>
                    dispatch({ type: ACTIONS.FUNDOPEN, payload: row })
                  }
                  color="success"
                  disabled={row.BCoverage !== "ILP1"}
                >
                  <CreditScoreIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MRTAEnquiry
        open={isMrta}
        handleClose={mrtaClose}
        policyNo={policyRecord.ID}
      />
    </Paper>
  );
}

export default BenefitTable;
