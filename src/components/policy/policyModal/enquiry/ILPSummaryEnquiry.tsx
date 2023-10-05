import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import ReportIcon from "@mui/icons-material/Summarize";
import { Button,Menu, MenuItem } from "@mui/material";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import Notification from "../../../../utilities/Notification/Notification";

const ILPSummaryEnquiry = ({ ilpSummaryData, policyNo, state }: any) => {
  console.log(ilpSummaryData, "Inside ilp summmary enquiry");



  const columns = [
    {
      field: "BenefitID",
      header: "Benefit ID",
      dbField: "benefit_id",
    },

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
      field: "FundUnits",
      header: "Fund Units",
      dbField: "fund_units",
    },
    {
      field: "FundPrice",
      header: "Fund Price",
    },
    {
      field: "opfundvalue",
      header: "Offer Price",
    },
  ];

  const [ilpTranOpen, setilpTranOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const reportMenuopen = Boolean(anchorEl);

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
      reportFunction: "ilpSummary",
      policyid: policyNo
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
    if(reportGetStatus === "completed" && reportGetError){
      setNotify({
        isOpen: true,
        message: reportGetError,
        type: "error",
      });
    }
  }, [reportGetStatus, reportGetError]);

  return (
    <div>
    <CustomTooltip text="Reports">
        <Button
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
        </Button>
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
      <form>
        <EnquiryTable
          data={ilpSummaryData}
          columns={columns}
          ilpTOpen={ilpTranOpen}
          policyNo={policyNo}
        />
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ILPSummaryEnquiry;
