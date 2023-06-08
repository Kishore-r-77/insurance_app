import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TranReversalTable from "./TranReversalTable";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import { getAllHistrotyReverse } from "../csmmApis/tranReversalApis";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField } from "@mui/material";
import { addApi } from "../csmmApis/tranReversalApis";

const TranReversalModal = ({
  open,
  handleClose,
  policyId,
  getPolicyData,
}: any) => {
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);
  const [searchString, setsearchString] = useState("");
  const [searchCriteria, setsearchCriteria] = useState("");

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
      field: "Tranno",
      header: "Tran No",
      dbField: "tranno",
    },
    {
      field: "ShortDescription",
      header: "Short Description",
      dbField: "short_description",
    },
    {
      field: "LongDescription",
      header: "LongDescription",
      dbField: "long_description",
    },
    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },
    {
      field: "PHistoryCode",
      header: "History Code",
      dbField: "history_code",
    },
  ];

  const [historyReversalData, sethistoryReversalData] = useState([]);
  const getHistoryRerverse = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/historygetreverse/${policyId}`,

        { withCredentials: true }
      )
      .then((resp) => {
        sethistoryReversalData(resp.data?.History);
      })
      .catch((err) => {
        return err;
      });
  };

  //data from getall Reversed api
  const [data, setData] = useState([]);

  const getData = () => {
    return getAllHistrotyReverse(
      pageNum,
      pageSize,
      searchString,
      searchCriteria,
      policyId
    )
      .then((resp) => {
        console.log(resp);
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["History"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["History"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  console.log(data, "data");

  const nexPage = () => {
    setpageNum((prev) => prev + 1);
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pageNum > 1) {
      setpageNum((prev) => prev - 1);
    } else return;
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [open]);

  useEffect(() => {
    getData();
    return () => {};
  }, [pageNum, pageSize]);

  const [Tranno, setTranno] = useState(0);
  const [isTranReversal, setisTranReversal] = useState(false);
  const tranReversalClick = (tranNo: any) => {
    setTranno(tranNo);
    setisTranReversal(true);
  };

  const tranReversalClose = () => {
    setisTranReversal(false);
    setRemark("");
  };

  const [Remark, setRemark] = useState("");

  const reversalSubmit = () => {
    return addApi(Remark, Tranno, policyId).then((resp) => {
      tranReversalClose();
      getData();
      getPolicyData();
    });
  };

  return (
    <div>
      <Modal
        show={isTranReversal ? isTranReversal : open}
        onHide={isTranReversal ? tranReversalClose : handleClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Transaction Reversal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              {isTranReversal ? (
                <form>
                  <Grid2 container spacing={2}>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        InputProps={{ readOnly: true }}
                        id="policyId"
                        name="policyId"
                        value={policyId}
                        placeholder="Policy Id"
                        label="Policy Id"
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>

                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        InputProps={{ readOnly: true }}
                        id="Tranno"
                        name="Tranno"
                        value={Tranno}
                        placeholder="Tran No"
                        label="Tran No"
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>

                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        multiline
                        id="Remark"
                        name="Remark"
                        value={Remark}
                        placeholder="Rev Remark"
                        label="Rev Remark"
                        fullWidth
                        margin="dense"
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </Grid2>
                  </Grid2>
                </form>
              ) : (
                <form>
                  <TranReversalTable
                    data={data}
                    columns={columns}
                    tranReversalClick={tranReversalClick}
                  />

                  <CustomPagination
                    pageNum={pageNum}
                    setpageSize={setpageSize}
                    // totalPages={totalPages}
                    totalRecords={totalRecords}
                    isLast={isLast}
                    prevPage={prevPage}
                    nexPage={nexPage}
                  />
                </form>
              )}
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={isTranReversal ? tranReversalClose : handleClose}
          >
            Close
          </Button>
          {isTranReversal ? (
            <Button variant="primary" onClick={() => reversalSubmit()}>
              Reverse
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TranReversalModal;
