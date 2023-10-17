import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Button1 from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import ReportIcon from "@mui/icons-material/Summarize";
import { Menu, MenuItem } from "@mui/material";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import Notification from "../../../../utilities/Notification/Notification";

const ILPTransactionEnquiry = ({
  open,
  handleClose,
  policyNo,
  fundCode,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const reportMenuopen = Boolean(anchorEl);

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
        console.log(ilpTransactionData, "ilpTransactionData");
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };

  const {
    sendRequest: sendReportGetRequest,
    status: reportGetStatus,
    data: getReportResponse,
    error: reportGetError,
  } = useHttp(getData, true);

  const handleReportMenuPop = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReportMenuClose = () => {
    setAnchorEl(null);
  };

  const getReport = async (type: any) => {
    let getDataParams = {
      reportType: type,
      reportFunction: "ilpTransaction",
      policyid: policyNo,
      fundCode: fundCode,
    };

    sendReportGetRequest({
      apiUrlPathSuffix: "/ilpservices/ilpreports",
      getDataParams: getDataParams,
      isBlob: true,
    });
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    geIlptransaction();
  }, [open]);

  useEffect(() => {
    if (reportGetStatus === "completed" && !reportGetError) {
      const url = window.URL.createObjectURL(
        new Blob([getReportResponse.data])
      );
      const link = document.createElement("a");
      link.href = url;
      const filename =
        getReportResponse.headers["content-disposition"].split("filename=")[1];
      link.setAttribute("download", filename);
      link.click();
    }
    if (reportGetStatus === "completed" && reportGetError) {
      setNotify({
        isOpen: true,
        message: reportGetError,
        type: "error",
      });
    }
  }, [reportGetStatus, reportGetError]);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"ILP Transaction"}</Modal.Title>
          <CustomTooltip text="Reports">
            <Button1
              //id={styles["add-btn"]}
              style={{
                marginTop: "1rem",
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "40px",
                backgroundColor: "#0a3161",
              }}
              variant="contained"
              color="primary"
              onClick={handleReportMenuPop}
            >
              <ReportIcon />
            </Button1>
          </CustomTooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={reportMenuopen}
            onClose={handleReportMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            elevation={0}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem
              onClick={() => {
                getReport("excel");
              }}
            >
              <span style={{ fontSize: ".8em" }}>Excel Report</span>
            </MenuItem>

            <MenuItem
              onClick={() => {
                getReport("pdf");
              }}
            >
              <span style={{ fontSize: ".8em" }}>Pdf Report</span>
            </MenuItem>
          </Menu>
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
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ILPTransactionEnquiry;
