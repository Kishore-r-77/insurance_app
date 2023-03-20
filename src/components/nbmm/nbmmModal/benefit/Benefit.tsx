import { Paper } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import CustomModal from "../../../../utilities/modal/CustomModal";
import Client from "../../../clientDetails/client/Client";
import styles from "./benefit.module.css";

function Benefit({
  coverage,
  ACTIONS,
  benefitData,
  dispatchBenefit,
  clientOpenFunc,
}: any) {
  const [isChecked, setisChecked] = useState(false);
  console.log("ischecked", isChecked);
  return (
    <div>
      <Paper className={styles.paperStyle}>
        <Table striped bordered hover>
          <thead className={styles.header}>
            <tr>
              <th>Select Coverage</th>
              <th>BCoverage</th>
              <th>BCoverage Long Name</th>
              <th>Client Id</th>
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
                  disabled={val.Mandatory === "Y"}
                  defaultChecked={val.Mandatory === "Y"}
                  value={val.Mandatory[index]}
                  onChange={(e) => setisChecked(e.target.checked)}
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
                        fieldName: "BCoverage",
                        index,
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
                        index,
                      })
                    }
                    disabled
                  />
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="text"
                    // onClick={() =>
                    //   dispatchBenefit({ type: ACTIONS.CLIENTOPEN })
                    // }
                    id="ClientID"
                    name="ClientID"
                    disabled={val.Coverage === "WOPR" && isChecked === false}
                    value={benefitData[index]?.ClientID}
                    placeholder="Client Id"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientID",
                        index,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    defaultValue={moment().format("YYYY-MM-DD").toString()}
                    className={styles["input-form"]}
                    type="date"
                    value={benefitData[index]?.BStartDate}
                    disabled={val.Coverage === "WOPR" && isChecked === false}
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
                    disabled={val.Coverage === "WOPR" && isChecked === false}
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
                    disabled={val.Coverage === "WOPR" && isChecked === false}
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
                    disabled={val.Coverage === "WOPR" && isChecked === false}
                    onChange={(e) =>
                      dispatchBenefit({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "BSumAssured",
                        index,
                      })
                    }
                  />
                </td>
                <CustomModal
                  open={benefitData[index]?.clientOpen}
                  handleClose={() =>
                    dispatchBenefit({ type: ACTIONS.CLIENTCLOSE, index })
                  }
                >
                  <Client modalFunc={clientOpenFunc} />
                </CustomModal>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </div>
  );
}

export default Benefit;
