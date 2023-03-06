import { Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./benefit.module.css";

function Benefit({ coverage, ACTIONS, benefitData, dispatchBenefit }: any) {
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
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Coverage",
                      })
                    }
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="text"
                    value={val.CoverageLongName}
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "CoverageLongName",
                      })
                    }
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="date"
                    value={benefitData[index]?.BStartDate}
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "BStartDate",
                        index,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    value={benefitData[index]?.BTerm}
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "BTerm",
                        index,
                      })
                    }
                    placeholder="BTerm"
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    placeholder="BPTerm"
                    value={benefitData[index]?.BPTerm}
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "BPTerm",
                        index,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    placeholder="BSumAssured"
                    value={benefitData[index]?.BSumAssured}
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "BSumAssured",
                      })
                    }
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
