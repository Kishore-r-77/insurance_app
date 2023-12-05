import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ComponentAddEnquiry = ({
  open,
  handleClose,
  policyNo,
  TransactionNo,
  state,
}: any) => {
  const columns = [
    {
      field: "CompanyID",
      header: "Company ID",
      dbField: "company_id",
    },
    {
      field: "PolicyID",
      header: "Policy ID",
      dbField: "policy_id",
    },
    {
      field: "ClientID",
      header: "Client ID",
      dbField: "client_id",
    },
    {
      field: "BCoverage",
      header: "BCoverage",
      dbField: "b_coverage",
    },
    {
      field: "BStartDate",
      header: "BStartDate",
      dbField: "b_start_date",
      type: "date",
    },
    {
      field: "BSumAssured",
      header: "BSumAssured",
      dbField: "b_sum_assured",
    },
    {
      field: "BTerm",
      header: "BTerm",
      dbField: "b_term",
    },
    {
      field: "BPTerm",
      header: "BPTerm",
      dbField: "bp_term",
    },
    {
      field: "BAnnualPrem",
      header: "BAnnualPrem",
      dbField: "b_annual_prem",
    },
    {
      field: "BGender",
      header: "BGender",
      dbField: "b_gender",
    },
    {
      field: "BDOB",
      header: "BDOB",
      dbField: "bdob",
      type: "date",
    },
    {
      field: "Method",
      header: "Method",
      dbField: "method",
    },
    {
      field: "Frequency",
      header: "Frequency",
      dbField: "frequency",
    },
    {
      field: "BAge",
      header: "BAge",
      dbField: "b_age",
    },
  ];

  const [componentAddData, setComponentData] = useState([]);
  const getComponentAddData = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/componentaddenq/${policyNo}/${TransactionNo}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setComponentData(resp.data.ComponentAdd);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getComponentAddData();

    return () => {};
  }, [open]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"Component Add"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable data={componentAddData} columns={columns} />
              </form>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComponentAddEnquiry;
