import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function GLAccountEnquiry({
  open,
  handleClose,
  policyNo,
  GLAccountNo,
  contractAmnt,
  state,
}: any) {
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
      field: "GlRldGlAmountgAcct",
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
      type: "date",
    },
  ];

  const [GLAccountData, setGLAccountData] = useState([]);
  const geGLAccountByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/glmoveaccode/${policyNo}/${GLAccountNo}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setGLAccountData(resp.data["History "]);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    geGLAccountByPolicy();

    return () => {};
  }, [open]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>GL Account ({contractAmnt})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable data={GLAccountData} columns={columns} />
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
}

export default GLAccountEnquiry;
