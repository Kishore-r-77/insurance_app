import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MRTAEnquiry = ({
  open,
  handleClose,
  policyNo,
  TransactionNo,
  state,
}: any) => {
  const columns = [
    {
      field: "BStartDate",
      header: "Benefit Start Date",
      dbField: "b_start_date",
      type: "date",
    },

    {
      field: "BTerm",
      header: "Term",
      dbField: "term",
    },

    {
      field: "PremPayingTerm",
      header: "Policy Year",
      dbField: "prem_paying_term",
    },

    {
      field: "BSumAssured",
      header: "Sum Assured",
      dbField: "basic_sa",
    },

    {
      field: "Interest",
      header: "Interest",
      dbField: "interest",
    },

    {
      field: "InterimPeriod",
      header: "Interim Period",
      dbField: "interim_period",
    },
  ];

  const [mrtaData, setmrtaData] = useState([]);
  const getmrtaAddData = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/mrtagetbypol/${policyNo}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setmrtaData(resp.data.Mrta);
        console.log(mrtaData, "DATA");
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getmrtaAddData();

    return () => {};
  }, [open]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"MRTA"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable data={mrtaData} columns={columns} />
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

export default MRTAEnquiry;
