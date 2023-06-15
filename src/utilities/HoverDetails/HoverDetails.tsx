import React from "react";
import styles from "./hoverDetails.module.css";
import moment from "moment";

function HoverDetails({ title, data }: any) {
  return (
    <div className={styles.container}>
      <h4>Policy Snapshot</h4>
      {data.map((val: any, index: number) => (
        <ul>
          <li>
            BillToDate:{" "}
            {val.BillToDate === ""
              ? ""
              : moment(val.BillToDate).format("YYYY/MM/DD")}
          </li>
          <li>
            PaidToDate:{" "}
            {val.PaidToDate === ""
              ? ""
              : moment(val.PaidToDate, "YYYYMMDD").format("YYYY/MM/DD")}
          </li>
          <li>Premium: {val.Premium}</li>
          <li>Status: {val.Status}</li>
        </ul>
      ))}
    </div>
  );
}

export default HoverDetails;
