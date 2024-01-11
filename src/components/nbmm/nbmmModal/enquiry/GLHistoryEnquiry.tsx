import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const GLHistoryEnquiry = ({
  open,
  handleClose,
  policyNo,
  TransactionNo,
  state,
}: any) => {
  const columns = [
    {
      field: "GlRdocno",
      header: "GL Account No",
      dbField: "gl_rdocno",
    },
    {
      field: "GlRldgAcct",
      header: "GL Account",
      dbField: "gl_rldg_acct",
    },
    {
      field: "GlCurry",
      header: "GL Curry",
      dbField: "gl_curry",
    },
    {
      field: "GlAmount",
      header: "GL Amount",
      dbField: "gl_amount",
    },
    {
      field: "ContractCurry",
      header: "Contract Currency",
      dbField: "contract_currency",
    },
    {
      field: "ContractAmount",
      header: "Contract Amount",
      dbField: "contract_amount",
    },
    {
      field: "AccountCodeID",
      header: "Account Code ID",
      dbField: "account_code_id",
    },
    {
      field: "AccountCode",
      header: "Account Code",
      dbField: "account_code",
    },
    {
      field: "GlSign",
      header: "GL Sign",
      dbField: "gl_sign",
    },
    {
      field: "SequenceNo",
      header: "Sequence No",
      dbField: "sequence_no",
    },
    {
      field: "CurrencyRate",
      header: "Currency Rate",
      dbField: "currency_rate",
    },
    {
      field: "CurrentDate",
      header: "Current Date",
      dbField: "currenct_date",
      type: "date",
    },
    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },
    {
      field: "ReconciledDate",
      header: "Reconciled Date",
      dbField: "reconciled_date",
      type: "date",
    },
    {
      field: "ExtractedDate",
      header: "Extracted Date",
      dbField: "extracted_date",
      type: "date",
    },
    {
      field: "HistoryCode",
      header: "History Code",
      dbField: "history_code",
    },
  ];

  const [GLHistoryData, setGLHistoryData] = useState([]);
  const geGLHistoryByTransaction = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/glmovepol/${policyNo}?searchString=${TransactionNo}&searchCriteria=tranno`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setGLHistoryData(resp.data.History);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    geGLHistoryByTransaction();

    return () => {};
  }, [open]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"GL History"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable data={GLHistoryData} columns={columns} />
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

export default GLHistoryEnquiry;
