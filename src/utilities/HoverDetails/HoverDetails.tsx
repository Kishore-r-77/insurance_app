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
              : moment(val.BillToDate).format("DD/MM/YYYY")}
          </li>
          <li>
            PaidToDate:{" "}
            {val.PaidToDate === ""
              ? ""
              : moment(val.PaidToDate, "YYYYMMDD").format("DD/MM/YYYY")}
          </li>
          <li>Premium: {val.Premium}</li>
          <li>Status: {val.Status}</li>
          <li>GST: {val.GST}</li>
          <li>Stamp Duty: {val.StampDuty}</li>
          <li>Policy Deposit: {val.PolicyDeposit}</li>
          {val.Status === "LA"
          ? <li>Interest: {val.Interest}</li>
          :null}
          <li>Net Payable: {val.Payable}</li>
          <li>Billing Currency: {val.BillingCurr}</li>
        </ul>
      ))}
    </div>
  );
}

export default HoverDetails;
