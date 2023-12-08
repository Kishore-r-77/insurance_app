import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const BenefitFundEnquiry = ({
  open,
  handleClose,
  policyNo,
  fundBenefitData,
}: any) => {
  const columns = [
    { field: "BenefitID", header: "Benefit ID", dbField: "benefit_id" },
    {
      field: "FundCode",
      header: "Fund Code",
      dbField: "fund_code",
    },
    {
      field: "FundType",
      header: "Fund Type",
      dbField: "fund_type",
    },

    {
      field: "FundCurr",
      header: "Fund Curr",
      dbField: "fund_curr",
    },

    {
      field: "FundPercentage",
      header: "Fund percentage",
      dbField: "fund_percentage",
    },

    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },
  ];

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>ILP Fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <form>
                <EnquiryTable
                  data={fundBenefitData}
                  columns={columns}
                  policyNo={policyNo}
                />
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

export default BenefitFundEnquiry;
