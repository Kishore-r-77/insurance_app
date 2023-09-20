import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ILPTransactionEnquiry = ({ open,
  handleClose,
  policyNo,
  fundCode,
  state, }: any) => {
    console.log(policyNo, fundCode, "ILPTransaction Pol no, Fund code")
    console.log(open, "ILPTransaction Open")
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

    {
      field: "InvNonInvFlag",
      header: "Investment/ Non-Investment Flag",
      dbField: "inv_non_inv_flag",
    },

    {
      field: "InvNonInvPercentage",
      header: "Investment/ Non-Investment Percentage",
      dbField: "inv_non_inv_percentage",
    },

    {
      field: "AccountCode",
      header: "Account Code",
      dbField: "account_code",
    },

    {
      field: "CurrencyRate",
      header: "Currency Rate",
      dbField: "currency_rate",
    },

    {
      field: "MortalityIndicator",
      header: "Mortality Indicator",
      dbField: "mortality_indicator",
    },

    {
      field: "SurrenderPercentage",
      header: "Surrender Percentage",
      dbField: "surrender_percentage",
    },

    {
      field: "Seqno",
      header: "Seq No",
      dbField: "seqno",
    },

    {
      field: "UlProcessFlag",
      header: "Ul Process Flag",
      dbField: "ul_process_flag",
    },

    {
      field: "UlpPriceDate",
      header: "Ulp Price Date",
      dbField: "ulp_price_date",
    },

    {
      field: "AllocationCategory",
      header: "Allocation Category",
      dbField: "allocation_category",
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
            console.log(ilpTransactionData,"ilpTransactionData")
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
