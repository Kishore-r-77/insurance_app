import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { IconButton, Paper } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppSelector } from "../../redux/app/hooks";
import styles from "./csmmTable.module.css";
import CustomModal from "../../utilities/modal/CustomModal";
import OwnerModal from "./ownerModal/OwnerModal";
import Payer from "../payer/Payer";
import Assignee from "../assignee/Assignee";
import FreqQuoteModal from "./freqQuoteModal/FreqQuoteModal";
import FreqChangeModal from "./freqChangeModal/FreqChangeModal";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import SaChangeModal from "./saChangeModal/SaChangeModal";
import Notification from "../../utilities/Notification/Notification";
import ComponentModal from "./componentModal/ComponentModal";
import TranReversalModal from "./tranReversalModal/TranReversalModal";
import AdjPremModal from "./adjPremModal/AdjPremModal";
import SurrenderModal from "./surrenderModal/SurrenderModal";
function CsmmTable({
  issueOpen,
  confirmOpen,
  data,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  hardDelete,
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
      .catch((err) => {
        console.log(err.message);
      });
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
      .catch((err) => {
        console.log(err.message);
      });
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
    console.log(policyId, "policy Id");

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
  const [isTranReversal, setIsTranReversal] = useState(false);
  const [isAdjPrem, setIsAdjPrem] = useState(false);
  const [isSurrender, setIsSurrender] = useState(false);
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

  const tranReversalOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsTranReversal(true);
  };
  const tranReversalClose = () => {
    setIsTranReversal(false);
  };

  const adjPremOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsAdjPrem(true);
  };
  const adjPremClose = () => {
    setIsAdjPrem(false);
  };
  const surrenderOpen = (policyId: number) => {
    setPolicyID(policyId);
    setIsSurrender(true);
  };
  const surrenderClose = () => {
    setIsSurrender(false);
  };

  const [polenqData, setPolenqData] = useState("");
  const getPolEnq = (id: number) => {
    axios
      .get(`http://localhost:3000/api/v1/deathservices/polheaderenq/${id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setPolenqData(resp?.data?.PolicyHeaderEnq);
      })
      .catch((err) => {
        console.log(err);

        setPolenqData("");
      });
  };

  useEffect(() => {
    getPolEnq(PolicyID);
    return () => {};
  }, [isAdjPrem]);

  const clientMenuClick = (value: any) => {
    console.log(value.Action, "****");
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
        handleClose();
        break;

      case "Assignee":
        assigneeOpen(policyId.current, value);
        handleClose();
        break;

      case "FreqChange":
        freqChangeOpen(policyId.current, value);
        handleClose();
        break;
      case "SaChange":
        saChangeOpen(policyId.current, value);
        handleClose();
        break;
      case "ComponentAdd":
        componentOpen(policyId.current, value);
        handleClose();
        break;
      case "TransReversal":
        tranReversalOpen(policyId.current, value);
        handleClose();
        break;
      case "AdjPrem":
        adjPremOpen(policyId.current, value);
        handleClose();
        break;
      case "Surrender":
        surrenderOpen(policyId.current);
        handleClose();
        break;
      default:
        return;
    }
  };

  const [isSaChange, setisSaChange] = useState(false);
  const [isComponent, setisComponent] = useState(false);
  const [saChangeMenu, setsaChangeMenu] = useState<any>("");
  const [componentMenu, setcomponentMenu] = useState<any>("");
  const [saChangeObj, setsaChangeObj] = useState<any>("");
  const [saChangeBenefits, setsaChangeBenefits] = useState<any>([]);
  const [surrenderBenefits, setsurrenderBenefits] = useState<any>([]);
  const [surrender, setSurrender] = useState<any>("");

  const isSave = useRef(false);

  const getSaChange = () => {
    axios
      .get(
        `http://${saChangeMenu?.URL}${PolicyID}`,

        { withCredentials: true }
      )
      .then((resp) => {
        setsaChangeObj(resp?.data?.Policy);
        setsaChangeBenefits(resp?.data?.Policy?.Benefits);
        isSave.current = false;
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

  const modifiedPremium = useRef();
  const premium = useRef();
  const postSaChange = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/changesa/${PolicyID}`,
        {
          Benefits: saChangeBenefits,
          BillToDate: saChangeObj.BillToDate,
          CompanyID: saChangeObj.CompanyID,
          InstalmentPremium: saChangeObj.InstalmentPremium,
          PaidToDate: saChangeObj.PaidToDate,
          PolicyID: saChangeObj.PolicyID,
          Product: saChangeObj.Product,
          Frequency: saChangeObj.Frequency,
          Function: "Calculate",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setsaChangeObj(resp.data?.Policy);
        setsaChangeBenefits(resp?.data?.Benefits);
        modifiedPremium.current = resp?.data?.ModifiedPrem;
        isSave.current = true;
        //saChangeClose();
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
  const saveSaChange = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/changesa/${PolicyID}`,
        {
          Benefits: saChangeBenefits,
          Function: "Save",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setsaChangeObj(resp.data?.Policy);
        setsaChangeBenefits(resp?.data?.Benefits);
        isSave.current = false;
        saChangeClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Saved Successfully",
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

  console.log(isSave.current, "IsSave");

  const invalidatesa = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/invalidatesa/${PolicyID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: resp?.data?.success,
          type: "error",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.data?.error,
          type: "error",
        });
      });
  };
  const [componentData, setcomponentData] = useState("");
  const [componentBenefits, setcomponentBenefits] = useState([]);
  const getComponentInit = () => {
    axios
      .get(
        `http://${componentMenu?.URL}${PolicyID}`,

        { withCredentials: true }
      )
      .then((resp) => {
        setcomponentData(resp.data?.result);
        setcomponentBenefits(resp.data?.result?.Benefits);
        isSave.current = false;
      })
      .catch((err) => {
        return err;
      });
  };
  const postComponentAdd = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/addcomponent/${PolicyID}`,
        {
          Benefits: componentBenefits.map((benefit: any) => ({
            ...benefit,
            ClientID: parseInt(benefit?.ClientID),
            BSumAssured: parseInt(benefit?.BSumAssured),
            BTerm: parseInt(benefit?.BTerm),
            BPTerm: parseInt(benefit?.BPTerm),
            BPrem: parseInt(benefit?.BPrem),
          })),
          Function: "Calculate",
        },

        { withCredentials: true }
      )
      .then((resp) => {
        // setcomponentData(resp.data?.result);
        setcomponentBenefits(resp.data?.result);
        isSave.current = true;
        premium.current = resp?.data?.premium;
        setNotify({
          isOpen: true,
          message: "Calculated Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.data?.error,
          type: "error",
        });
      });
  };

  const saveComponent = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/addcomponent/${PolicyID}`,
        {
          Benefits: componentBenefits.map((benefit: any) => ({
            ...benefit,
            ClientID: parseInt(benefit?.ClientID),
            BSumAssured: parseInt(benefit?.BSumAssured),
            BTerm: parseInt(benefit?.BTerm),
            BPTerm: parseInt(benefit?.BPTerm),
            BPrem: parseInt(benefit?.BPrem),
            // BDOB:
            //   benefit.BDOB === ""
            //     ? ""
            //     : moment(benefit.BDOB).format("YYYYMMDD"),
          })),
          Function: "Save",
          // BillToDate: componentData.BillToDate,
          // CompanyID: companyId,
          // Frequency: componentData?.Frequency,
          // InstalmentPremium: componentData?.InstalmentPremium,
          // PaidToDate: componentData.PaidToDate,
          // PolicyID: componentData.PolicyID,
          // Product: componentData.Product,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        isSave.current = false;
        setcomponentBenefits(resp.data?.result);
        setNotify({
          isOpen: true,
          message: "Saved Successfully",
          type: "success",
        });

        componentClose();
        getData();
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  useEffect(() => {
    if (isComponent) {
      getComponentInit();
    }
    return () => {};
  }, [isComponent]);
  const saChangeOpen = (policyId: number, value: any) => {
    setisSaChange(true);
    setsaChangeMenu(value);
    setPolicyID(policyId);
  };
  const saChangeClose = () => {
    setisSaChange(false);
    console.log(isSave, "isSave");

    if (isSave.current) {
      invalidatesa();
    }
  };

  const componentOpen = (policyId: number, value: any) => {
    setisComponent(true);
    setcomponentMenu(value);
    setPolicyID(policyId);
  };
  const componentClose = () => {
    setisComponent(false);
    if (isSave.current) {
      invalidatca();
    }
  };

  useEffect(() => {
    if (isSaChange) {
      getSaChange();
    }
    return () => {};
  }, [isSaChange]);

  const invalidatca = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/invalidateca/${PolicyID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: resp?.data?.success,
          type: "error",
        });
        isSave.current = false;
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.data?.error,
          type: "error",
        });
      });
  };

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
            {/* <th>Benefit</th> */}
            <th>Actions</th>
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

              {/* <td>
                <BusinessIcon
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.BENEFITOPEN,
                      payload: row,
                    })
                  }
                />
              </td> */}

              <td>
                <span className={styles.flexButtons}>
                  {/* <EditIcon
                      color="primary"
                      onClick={() =>
                        dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                      }
                    />
                    <DeleteIcon
                      color="error"
                      onClick={() => hardDelete(row.ID)}
                    /> */}
                  <InfoIcon
                    onClick={() =>
                      dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                    }
                  />
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => handleClick(e, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {clientMenuData.map((clientValue: any) => (
                      <MenuItem onClick={() => clientMenuClick(clientValue)}>
                        {clientValue?.Action}
                      </MenuItem>
                    ))}
                  </Menu>
                  {/* <IconButton
                    id="basic-button"
                    aria-controls={csOpen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={csOpen ? "true" : undefined}
                    onClick={(e) => handleServiceClick(e, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={csAnchor}
                    open={csOpen}
                    onClose={handleServiceClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {clientServiceMenuData.map((clientValue: any) => (
                      <MenuItem onClick={() => clientMenuClick(clientValue)}>
                        {clientValue?.Action}
                      </MenuItem>
                    ))}
                  </Menu> */}
                </span>
              </td>
              {/* <td>
                <ChangeCircleIcon
                  color="secondary"
                  onClick={() => saChangeOpen(row)}
                />
              </td> */}
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
      <TranReversalModal
        open={isTranReversal}
        handleClose={tranReversalClose}
        policyId={PolicyID}
        getPolicyData={getData}
        setNotify={setNotify}
      />
      <AdjPremModal
        open={isAdjPrem}
        handleClose={adjPremClose}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        data={polenqData}
      />
      <SurrenderModal
        open={isSurrender}
        handleClose={surrenderClose}
        policyId={policyId}
        surrender={surrender}
        surrenderBenefits={surrenderBenefits}
        setsurrenderBenefits={setsurrenderBenefits}
        isSave={isSave?.current}
        policyRecord={enquiryRecord.current}
      />
      <SaChangeModal
        open={isSaChange}
        handleClose={saChangeClose}
        saChangeObj={saChangeObj}
        saChangeBenefits={saChangeBenefits}
        setsaChangeBenefits={setsaChangeBenefits}
        postSaChange={postSaChange}
        isSave={isSave?.current}
        saveSaChange={saveSaChange}
        getData={getData}
      />
      <ComponentModal
        open={isComponent}
        handleClose={componentClose}
        componentData={componentData}
        componentBenefits={componentBenefits}
        setcomponentBenefits={setcomponentBenefits}
        postComponentAdd={postComponentAdd}
        premium={premium}
        isSave={isSave?.current}
        saveComponent={saveComponent}
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
    </Paper>
  );
}

export default CsmmTable;
