import { IconButton, Paper } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import CustomModal from "../../../../utilities/modal/CustomModal";
import Client from "../../../clientDetails/client/Client";
import styles from "./benefit.module.css";
import { IoIosOpen } from "react-icons/io";

function Benefit({
  coverage,
  ACTIONS,
  benefitData,
  dispatchBenefit,
  clientBenefitOpenFunc,
  companyId,
  clientOpen,
  handleClientOpen,
  setclientOpen,
}: any) {
  const size = "xl";
  const [isChecked, setisChecked] = useState(false);

  const [btermData, setbtermData] = useState([]);
  const [bptermData, setbptermData] = useState([]);

  const getbterm = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "Q0015",
          date: "20220101",
          item: "END1",
          company_id: companyId,
        },
      })
      .then((resp) => setbtermData(resp.data.ppt))
      .catch((err) => err.message);
  };
  const getbpterm = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "Q0016",
          date: "20220101",
          item: "END1",
          company_id: companyId,
        },
      })
      .then((resp) => setbptermData(resp.data.ppt))
      .catch((err) => err.message);
  };

  useEffect(() => {
    getbterm();
    getbpterm();
    return () => {};
  }, []);

  console.log(clientOpen.index, "Index from Benefit");

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
                <td style={{ display: "flex" }}>
                  <input
                    className={styles["input-form"]}
                    type="text"
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
                  <span
                    style={{
                      padding: "4px",
                      backgroundColor: "silver",
                    }}
                    onClick={() => handleClientOpen(true, index)}
                  >
                    <IoIosOpen />
                  </span>
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
                  <select
                    className={styles["input-form"]}
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
                  >
                    <option selected value="">
                      None
                    </option>
                    {btermData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className={styles["input-form"]}
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
                  >
                    <option selected value="">
                      None
                    </option>
                    {bptermData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className={styles["input-form"]}
                    type="number"
                    placeholder="Sum Assured"
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
                  size={size}
                  open={clientOpen.open}
                  handleClose={() => setclientOpen({ open: false, index: 0 })}
                >
                  <Client
                    dataIndex={clientOpen}
                    modalFunc={clientBenefitOpenFunc}
                  />
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
