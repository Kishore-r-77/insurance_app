import { Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./benefit.module.css";

function Benefit({ coverage, ACTIONS }: any) {
  return (
    <div>
      <Paper className={styles.paperStyle}>
        <Table striped bordered hover>
          <thead className={styles.header}>
            <tr>
              <th>Select Coverage</th>
              <th>BCoverage</th>
              <th>BCoverage Long Name</th>
              <th>BStartDate</th>
              <th>BTerm</th>
              <th>BPTerm</th>
              <th>BSumAssured</th>
            </tr>
          </thead>
          <tbody>
            {coverage.map((val: any, index: any) => (
              <tr key={val.Coverage}>
                <input
                  className={styles["input-form"]}
                  type="checkbox"
                  checked={val.Mandatory === "Y"}
                />
                <td>
                  <input
                    className={styles["input-form"]}
                    type="text"
                    value={val.Coverage}
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="text"
                    value={val.CoverageLongName}
                    disabled
                  />
                </td>
                <td>
                  <input className={styles["input-form"]} type="date" />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    placeholder="BTerm"
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    placeholder="BPTerm"
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    placeholder="BSumAssured"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </div>
  );
}

export default Benefit;
