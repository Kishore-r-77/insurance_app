import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { IconButton, Paper } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppSelector } from "../../redux/app/hooks";
import Notification from "../../utilities/Notification/Notification";
import CustomModal from "../../utilities/modal/CustomModal";
import Assignee from "../assignee/Assignee";
import Payer from "../payer/Payer";
import FreqChangeModal from "./freqChangeModal/FreqChangeModal";
import FreqQuoteModal from "./freqQuoteModal/FreqQuoteModal";
import styles from "./newbussinesstable.module.css";
import OwnerModal from "./ownerModal/OwnerModal";
import SaChangeModal from "./saChangeModal/SaChangeModal";
import { clonePolicyApi } from "../newBusiness/newBusinessApis/newBusinessApis";
import NotificationModal from "../../utilities/modal/NotificationModal";
import FileCopyIcon from "@mui/icons-material/FileCopy";

function NewBussinessTable({
  issueOpen,
  confirmOpen,
  data,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  modalFunc,
  getData,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [csAnchor, setCsAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const csOpen = Boolean(csAnchor);

  const policyId = useRef(0);
  const enquiryRecord = useRef<any>();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: any
  ) => {
    policyId.current = value.ID;
    enquiryRecord.current = value;
    setAnchorEl(event.currentTarget);
    clientMenu();
  };
  const handleServiceClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: any
  ) => {
    policyId.current = value.ID;
    enquiryRecord.current = value;
    setCsAnchor(event.currentTarget);
    clientServiceMenu();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleServiceClose = () => {
    setCsAnchor(null);
  };

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [clientData, setclientData] = useState([]);
  const [isClientOpen, setisClientOpen] = useState(false);

  const getClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${enquiryRecord?.current?.ClientID}`,
        { withCredentials: true }
      )
      .then((resp) => setclientData(resp.data?.Client))
      .catch((err) => err.message);
  };

  const clientOpen = () => {
    setisClientOpen(true);
  };

  const clientClose = () => {
    setisClientOpen(false);
  };

  useEffect(() => {
    getClient();
    return () => {};
  }, [isClientOpen === true]);

  const [clientMenuData, setclientMenuData] = useState([]);
  const clientMenu = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "P0044",
          date: "20220101",
          item: "CLIENTMM",
          company_id: companyId,
        },
      })
      .then((resp) => {
        setclientMenuData(resp.data?.AllowedMenus);
      })
      .catch((err) => {});
  };
  const [clientServiceMenuData, setclientServiceMenuData] = useState([]);
  const clientServiceMenu = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramextradata`,

        {
          params: {
            name: "P0044",
            date: "20220101",
            item: "CSMM",
            company_id: companyId,
          },
          withCredentials: true,
        }
      )
      .then((resp) => {
        setclientServiceMenuData(resp.data?.AllowedMenus);
      })
      .catch((err) => {});
  };

  const [isPayer, setisPayer] = useState(false);

  const [PolicyID, setPolicyID] = useState(0);
  const [payerObj, setpayerObj] = useState<any>({});
  const payerOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setisPayer(true);
    setpayerObj(value);

    handleClose();
  };

  const payerClose = () => {
    setisPayer(false);
  };

  const [payerByPolicyData, setpayerByPolicyData] = useState([]);

  const getPayerByPolicy = (id: number) => {
    axios
      .get(`http://${payerObj?.URL}${id}`, { withCredentials: true })
      .then((resp) => {
        setpayerByPolicyData(resp?.data?.Payer);
      })
      .catch((err) => {
        console.log(err);
        setpayerByPolicyData([]);
      });
  };

  useEffect(() => {
    getPayerByPolicy(PolicyID);
    return () => {};
  }, [isPayer]);

  const [isAssignee, setisAssignee] = useState(false);
  const [assigneeObj, setassigneeObj] = useState<any>({});
  const assigneeOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setisAssignee(true);
    setassigneeObj(value);

    handleClose();
  };

  const assigneeClose = () => {
    setisAssignee(false);
  };

  const [assigneeByPolicyData, setassigneeByPolicyData] = useState([]);

  const getAssigneeByPolicy = (id: number) => {
    axios
      .get(`http://${assigneeObj?.URL}${id}`, { withCredentials: true })
      .then((resp) => {
        setassigneeByPolicyData(resp?.data?.asignee);
      })
      .catch((err) => {
        console.log(err);

        setassigneeByPolicyData([]);
      });
  };

  useEffect(() => {
    getAssigneeByPolicy(PolicyID);
    return () => {};
  }, [isAssignee]);
  const [isFreqQuote, setIsFreqQuote] = useState(false);

  const freqQuoteOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsFreqQuote(true);
  };
  const freqQuoteClose = () => {
    setIsFreqQuote(false);
  };
  const [isFreqChange, setIsFreqChange] = useState(false);
  const [completed, setcompleted] = useState(false);
  const [func, setfunc] = useState<any>("Calculate");
  const freqChangeOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsFreqChange(true);
  };
  const freqChangeClose = () => {
    setIsFreqChange(false);
    setcompleted(false);
    setfunc("Calculated");
  };

  const clientMenuClick = (value: any) => {
    switch (value.Action) {
      case "Nominee":
        dispatch({
          type: ACTIONS.NOMINEEOPEN,
          payload: enquiryRecord?.current,
        });
        handleClose();
        break;
      case "Payer":
        payerOpen(policyId.current, value);
        handleClose();
        break;
      case "Owner":
        clientOpen();
        handleClose();
        break;
      case "FreqQuote":
        freqQuoteOpen(policyId.current, value);
        handleServiceClose();
        break;

      case "Assignee":
        assigneeOpen(policyId.current, value);
        handleClose();
        break;

      case "FreqChange":
        freqChangeOpen(policyId.current, value);
        handleServiceClose();
        break;
      default:
        return;
    }
  };

  const [isSaChange, setisSaChange] = useState(false);
  const [saPolicyRecord, setsaPolicyRecord] = useState<any>("");
  const [saChangeObj, setsaChangeObj] = useState<any>("");
  const [saChangeBenefits, setsaChangeBenefits] = useState<any>([]);

  const getSaChange = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/changesa/${saPolicyRecord.ID}`,
        {
          Function: "",
          PolicyID: saPolicyRecord.ID,
          TotalPremium: 0,
          NewTotalPremium: 0,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setsaChangeObj(resp?.data?.Policy);
        setsaChangeBenefits(resp?.data?.Policy?.Benefits);
      })
      .catch((err) => {
        setisSaChange(false);
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };
  const postSaChange = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/changesa/${saPolicyRecord.ID}`,
        {
          Benefits: saChangeBenefits,
          BillToDate: saChangeObj.BillToDate,
          CompanyID: saChangeObj.CompanyID,
          InstalmentPremium: saChangeObj.InstalmentPremium,
          PaidToDate: saChangeObj.PaidToDate,
          PolicyID: saChangeObj.PolicyID,
          Product: saChangeObj.Product,
          Function: "Calculate",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setsaChangeObj(resp.data?.Policy);
        saChangeClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Calculated Successfully",
          type: "success",
        });
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  const cloningPolicy = (policyId: number) => {
    clonePolicyApi(policyId)
      .then((resp) => {
        clonePolicyClose();
        getData();
        setNotify({
          isOpen: true,
          message: `Cloned ${policyId} - new policy:${resp.data.result}`,
          type: "success",
        });
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  const [isClone, setisClone] = useState(false);

  const clonePolicyOpen = (polId: number) => {
    setPolicyID(polId);
    setisClone(true);
  };
  const clonePolicyClose = () => {
    setisClone(false);
  };

  const saChangeOpen = (value: any) => {
    setisSaChange(true);
    setsaPolicyRecord(value);
  };
  const saChangeClose = () => {
    setisSaChange(false);
  };

  useEffect(() => {
    if (isSaChange) {
      getSaChange();
    }
    return () => {};
  }, [isSaChange]);

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
                <th key={column.dbField} className={styles.header}>
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
            <th className={styles.header}>Benefit</th>
            <th className={styles.header}>Clone</th>
            <th className={styles.header}>Actions</th>
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
                return <td key={col.field}>{row[col.field]}</td>;
              })}
              <td>
                <BusinessIcon
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.BENEFITOPEN,
                      payload: row,
                    })
                  }
                />
              </td>
              <td>
                <FileCopyIcon
                  color="success"
                  onClick={() => clonePolicyOpen(row.ID)}
                />
              </td>

              <td>
                <span className={styles.flexButtons}>
                  <EditIcon
                    color="primary"
                    onClick={() =>
                      dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                    }
                  />
                  <InfoIcon
                    onClick={() =>
                      dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                    }
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <OwnerModal
        record={clientData}
        open={isClientOpen}
        handleClose={clientClose}
      />
      <FreqQuoteModal
        open={isFreqQuote}
        handleClose={freqQuoteClose}
        policyId={PolicyID}
      />
      <FreqChangeModal
        open={isFreqChange}
        handleClose={freqChangeClose}
        policyId={PolicyID}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        getData={getData}
      />
      <SaChangeModal
        open={isSaChange}
        handleClose={saChangeClose}
        saChangeObj={saChangeObj}
        saChangeBenefits={saChangeBenefits}
        setsaChangeBenefits={setsaChangeBenefits}
        postSaChange={postSaChange}
      />
      <CustomModal open={isPayer} handleClose={payerClose} size="xl">
        <Payer
          lookup={isPayer}
          payerByPolicyData={payerByPolicyData}
          policyId={PolicyID}
          getPayerByPolicy={getPayerByPolicy}
        />
      </CustomModal>
      <CustomModal open={isAssignee} handleClose={assigneeClose} size="xl">
        <Assignee
          lookup={isAssignee}
          assigneeByPolicyData={assigneeByPolicyData}
          policyId={PolicyID}
          getAssigneeByPolicy={getAssigneeByPolicy}
        />
      </CustomModal>
      <Notification notify={notify} setNotify={setNotify} />
      <NotificationModal
        open={isClone}
        handleClose={clonePolicyClose}
        handleFormSubmit={() => cloningPolicy(PolicyID)}
        title="Clone Policy"
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#4CAF50", // Bold green background
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)", // Subtle box shadow
          }}
        >
          <h3
            style={{
              color: "#fff", // White text
              backgroundColor: "#333", // Dark background for the title
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Slightly darker box shadow
            }}
          >
            Are you sure you want to clone this policy?
          </h3>
          <div>
            <FileCopyIcon
              style={{
                fontSize: "120px",
                color: "#FFD700", // Gold icon color
                opacity: "0.9",
              }}
            />
          </div>
        </div>
      </NotificationModal>
    </Paper>
  );
}

export default NewBussinessTable;
