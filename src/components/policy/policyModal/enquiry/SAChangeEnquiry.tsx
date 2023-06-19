import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SAChangeEnquiry = ({
  open,
  handleClose,
  policyNo,
  TransactionNo,
  state,
}: any) => {
  console.log(policyNo, "Policy No");
  console.log(TransactionNo, "Transaction No");
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
      field: "BenefitID",
      header: "Benefit ID",
      dbField: "benefit_id",
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
      field: "BPrem",
      header: "BPrem",
      dbField: "b_prem",
    },
    {
      field: "NSumAssured",
      header: "NSumAssured",
      dbField: "n_sum_assured",
    },
    {
      field: "NTerm",
      header: "NTerm",
      dbField: "n_term",
    },
    {
      field: "NPTerm",
      header: "NPTerm",
      dbField: "np_term",
    },
    {
      field: "NPrem",
      header: "NPrem",
      dbField: "n_prem",
    },
    {
      field: "NAnnualPrem",
      header: "NAnnualPrem",
      dbField: "n_annual_prem",
    },
  ];

  const [saChangeData, setsaChangeData] = useState([]);
  const getSAChangeData = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/GetSAChangeEnq/${policyNo}/${TransactionNo}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setsaChangeData(resp.data.SAChange);
        console.log(saChangeData, "DATA");
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getSAChangeData();

    return () => {};
  }, [open]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"SA Change"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable data={saChangeData} columns={columns} />
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

export default SAChangeEnquiry;
