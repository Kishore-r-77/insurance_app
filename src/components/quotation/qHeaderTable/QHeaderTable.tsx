import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Paper, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import moment from "moment";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./qHeaderTable.module.css";
import AcceptModal from "../AcceptModal/Accept";
import CalculateModal from "../CalculationModal/Calculation";
import CancelModal from "../CancelModal/Cancel";
import ValidateModal from "../ValidationModal/Validation";
import PrintModal from "../PrintModal/Print";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import { current } from "@reduxjs/toolkit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getQheader } from "../qHeaderApis/qHeaderApis";
import FinalizeModal from "../QHeaderQDetailEnquiry/FinalizeModal";
import Notification from "../../../utilities/Notification/Notification";

function QHeaderTable({
  issueOpen,
  confirmOpen,
  data,
  columns,
  dispatch,
  record,
  ACTIONS,
  sortParam,
  getData,
  hardDelete,
  modalFunc,
  initialValues,
  state,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const qheaderid = useRef<any>(0);
  const editpayload = useRef();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: any
  ) => {
    editpayload.current = value;
    qheaderid.current = value.ID;

    setAnchorEl(event.currentTarget);
    console.log(qheaderid.current, "----");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const header = qheaderid.current;

  const [allowedMenuRecord, setAllowedMenuRecord] = useState<any>("");
  const editClickOpen = (item: any, payload: any) => {
    setAllowedMenuRecord(item);
    if (item.Action === "Change") {
      dispatch({ type: ACTIONS.EDITOPEN, payload: editpayload.current });
    } else if (item.Action === "Validate") {
      setValidateOpen(true);
    } else if (item.Action === "Calculate") {
      setCalculateOpen(true);
    } else if (item.Action === "View") {
      navigate("/qBenIllValue", {
        state: { id: qheaderid.current },
      });
    } else if (item.Action === "Print") {
      setPrintOpen(true);
    } else if (item.Action === "Accept") {
      setAcceptOpen(true);
    } else if (item.Action === "Cancel") {
      setCancelOpen(true);
    } else if (item.Action === "Finalize") {
      dispatch({
        type: ACTIONS.POLICYCREATEOPEN,
        payload: editpayload.current,
      });
    }
    handleClose();
  };

  const handleClickClose = () => {};

  const [createQBenIllValuesData, setCreateQBenIllValuesData] = useState();
  const createQBenIllValues = (ID: number) => {
    axios
      .post(
        `http://localhost:3000/api/v1/quotationservices/qbenillvaluecreatebyqheader/${qheaderid.current}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        handleClickClose();
        setCreateQBenIllValuesData(initialValues);
        setNotify({
          isOpen: true,
          message: "Created Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const [statusCheckData, setStatusCheckData] = useState<any>();
  const editForm = async (item: any, row: any) => {
    try {
      const response = await axios
        .post(
          `http://localhost:3000/api/v1/quotationservices/qstatuscheck`,
          {
            CompanyID: parseInt(companyId),
            QHeaderID: parseInt(qheaderid.current),
            QStatus: qHeaderData.QStatus,
            QuoteDate: "20230402",
            TranCode: item.Trancode,
          },
          { withCredentials: true }
        )
        .then((resp) => {
          editClickOpen(item, row);
          getData();
          getQHeader();
          setNotify({
            isOpen: true,
            message: "Status Checked",
            type: "success",
          });
        })
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err?.response?.data?.error,
            type: "error",
          });
        });
    } catch {}
    handleClose();
  };
  const [qHeaderData, setQHeaderData] = useState<any>([]);
  const getQHeader = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/quotationservices/qheaderget/${qheaderid.current}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setQHeaderData(resp.data?.["QHeader"]);
      });
  };

  const [calculateOpen, setCalculateOpen] = useState(false);
  const handleCalculateOpen = (ID: any) => {
    setCalculateOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handleCalculateClose = () => {
    setCalculateOpen(false);
  };

  const [cancelOpen, setCancelOpen] = useState(false);
  const handleCancelOpen = (ID: any) => {
    setCancelOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handleCancelClose = () => {
    setCancelOpen(false);
  };

  const [acceptOpen, setAcceptOpen] = useState(false);
  const handleAcceptOpen = (ID: any) => {
    setAcceptOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handleAcceptClose = () => {
    setAcceptOpen(false);
  };

  const [printOpen, setPrintOpen] = useState(false);
  const handlePrintOpen = (ID: any) => {
    setPrintOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handlePrintClose = () => {
    setPrintOpen(false);
  };

  const [validateOpen, setValidateOpen] = useState(false);
  const handleValidateOpen = (ID: any) => {
    setValidateOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handleValidateClose = () => {
    setValidateOpen(false);
  };

  const [viewOpen, setViewOpen] = useState(false);
  const handleViewOpen = (ID: any) => {
    setViewOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handleViewClose = () => {
    setViewOpen(false);
  };

  const [PostponeWithdrawnOpen, setPostponeWithdrawnOpen] = useState(false);
  const handlePostponeWithdrawnOpen = (ID: any) => {
    setPostponeWithdrawnOpen(true);
    //setpolicyId(ID);
    handleClose();
  };
  const handlePostponeWithdrawnClose = () => {
    setPostponeWithdrawnOpen(false);
  };
  // const [finalizeOpen, setFinalizeOpen] = useState(false);
  // const handleFinalizeOpen = (ID: any) => {
  //   setFinalizeOpen(true);
  //   //setpolicyId(ID);
  //   handleClose();
  // };
  // const handleFinalizeClose = () => {
  //   setFinalizeOpen(false);
  // };

  const [p0044SQMMData, setP0044SQMMData] = useState<any>();
  const p0044SQMM = () => {
    if (allowedMenuRecord.Action === "Calculate") {
      createQBenIllValues(qheaderid.current);
    }
    axios
      .post(
        `http://${allowedMenuRecord.URL}/${qheaderid.current}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setP0044SQMMData(resp.data);
        if (allowedMenuRecord.Action === "Validate") {
          handleValidateClose();
          handleClose();
        } else if (allowedMenuRecord.Action === "Calculate") {
          handleCalculateClose();
        } else if (allowedMenuRecord.Action === "View") {
          handleViewClose();
        } else if (allowedMenuRecord.Action === "Print") {
          handlePrintClose();
        } else if (allowedMenuRecord.Action === "Accept") {
          handleAcceptClose();
        } else if (allowedMenuRecord.Action === "Cancel") {
          handleCancelClose();
        }
        getData();
        getQHeader();
      });
  };

  const [allowedMenuData, setAllowedMenuData] = useState([]);
  const getAllowedMenuData = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramextradata?date=20220101`,
        {
          params: {
            name: "P0044",
            item: "SQMM",
            company_id: companyId,
          },
          withCredentials: true,
        }
      )
      .then((resp) => {
        setAllowedMenuData(resp.data["AllowedMenus"]);
      });
  };

  const [qCommunicationData, setQCommunicationData] = useState("");
  const getQCommunicationByHeader = (row: number) => {
    axios
      .get(
        `http://localhost:3000/api/v1/quotationservices/getcommidbyqheader/${row}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setQCommunicationData(resp.data?.CommID);
        // downloadQuotePdf(qCommunicationData);
      });
  };
  const item = "QUOTE";
  const downloadQuotePdf = (id: any) => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/qgetReport?ID=${id}`, {
        withCredentials: true,
        responseType: "blob",
      })
      .then((resp) => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${item}.pdf`);
        link.click();
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getAllowedMenuData();
    p0044SQMM();

    return () => {};
  }, []);

  useEffect(() => {
    getQHeader();
    return () => {};
  }, [qheaderid.current]);
  useEffect(() => {
    downloadQuotePdf(qCommunicationData);

    return () => {};
  }, [qCommunicationData]);

  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns?.map(
              (
                column: {
                  field: string;
                  header: string;
                  dbField: string;
                  sortable: boolean;
                },
                index: number
              ) => (
                <th key={column.dbField}>
                  {column.header}
                  {column?.sortable && (
                    <span>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "asc",
                          });

                          return dispatch({
                            type: ACTIONS.SORT_ASC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowUpwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "asc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "desc",
                          });

                          dispatch({
                            type: ACTIONS.SORT_DESC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowDownwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "desc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                    </span>
                  )}
                </th>
              )
            )}
            {ACTIONS.EDITOPEN && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row)}
              key={row.ID}
              className={styles["table-cell"]}
            >
              {columns.map((col: { field: string; type: string }) => {
                if (col.type === "date") {
                  return (
                    <td key={col.field}>
                      {moment(row[col.field]).format("DD-MM-YYYY")}
                    </td>
                  );
                }
                return (
                  <td key={col.field}>
                    {row[col.field]}
                    {col.field === "QStatus" && row[col.field] === "QF" ? (
                      <Tooltip title={"PolicyNumber :  " + row.Policy}>
                        <InfoIcon />
                      </Tooltip>
                    ) : null}
                  </td>
                );
              })}

              {ACTIONS.EDITOPEN && (
                <td>
                  <span className={styles.flexButtons}>
                    <IconButton
                      onClick={() =>
                        dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                      }
                    >
                      {" "}
                      <InfoIcon />
                    </IconButton>

                    <IconButton
                      id="basic-button"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={(e) => handleClick(e, row)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    {row.QStatus === "QP" ||
                    row.QStatus === "QA" ||
                    row.QStatus === "QF" ? (
                      <IconButton
                        onClick={() => getQCommunicationByHeader(row.ID)}
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    ) : null}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {allowedMenuData.map((item: any) => (
                        <MenuItem
                          key={item.Action}
                          onClick={() => editForm(item, row)}
                        >
                          {item.Action}
                        </MenuItem>
                      ))}
                    </Menu>
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <AcceptModal
        open={acceptOpen}
        handleClose={handleAcceptClose}
        handleFormSubmit={p0044SQMM}
      />
      <CalculateModal
        open={calculateOpen}
        handleClose={handleCalculateClose}
        handleFormSubmit={p0044SQMM}
      />
      <CancelModal
        open={cancelOpen}
        handleClose={handleCancelClose}
        handleFormSubmit={p0044SQMM}
      />
      <PrintModal
        open={printOpen}
        handleClose={handlePrintClose}
        handleFormSubmit={p0044SQMM}
      />
      <ValidateModal
        open={validateOpen}
        handleClose={handleValidateClose}
        handleFormSubmit={p0044SQMM}
      />
      {/* <FinalizeModal
        open={finalizeOpen}
        handleClose={handleFinalizeClose}
        handleFormSubmit={p0044SQMM}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
      /> */}
      <FinalizeModal header={header} />
      <Notification notify={notify} setNotify={setNotify} />
    </Paper>
  );
}

export default QHeaderTable;
