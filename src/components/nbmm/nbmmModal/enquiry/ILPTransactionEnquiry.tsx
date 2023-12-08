import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ILPTransactionEnquiry = ({
  open,
  handleClose,
  policyNo,
  fundCode,
  state,
}: any) => {
  const columns = [
    {
      field: "FundCode",
      header: "Fund Code",
      dbField: "fund_code",
    },

    {
      field: "TransactionDate",
      header: "Transaction Date",
      dbField: "transaction_date",
      type: "date",
    },

    {
      field: "FundEffDate",
      header: "Fund Effective Date",
      dbField: "fund_eff_date",
      type: "date",
    },

    {
      field: "FundUnits",
      header: "Fund Units",
      dbField: "fund_units",
    },

    {
      field: "FundPrice",
      header: "Fund Price",
      dbField: "fund_price",
    },

    {
      field: "CurrentOrFuture",
      header: "Current Or Future",
      dbField: "current_or_future",
    },

    {
      field: "ContractCurry",
      header: "Contract Curry",
      dbField: "contract_currency",
    },

    {
      field: "FundAmount",
      header: "Fund Amount",
      dbField: "fund_amount",
    },

    {
      field: "HistoryCode",
      header: "History Code",
      dbField: "history_code",
    },
  ];

  const [ilpTransactionData, setilpTransactionData] = useState([]);
  const geIlptransaction = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/ilptransactionbyfundcode/${policyNo}/${fundCode}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setilpTransactionData(resp.data.IlpTransactions);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    geIlptransaction();
  }, [open]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"ILP Transaction"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable data={ilpTransactionData} columns={columns} />
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

export default ILPTransactionEnquiry;
