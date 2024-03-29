import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Paper } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import moment from "moment";
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Table from "react-bootstrap/Table";
import {
  ACTIONS as ILPSURRENDERACTIONS,
  ilpSurrenderInitialValue,
} from "../../reducerUtilities/actions/IlpSurrender/IlpSurrenderActions";
import {
  ACTIONS as MATURITYACTIONS,
  maturityInitialValue,
} from "../../reducerUtilities/actions/maturity/maturityAction";
import {
  ACTIONS as SURRENDERACTIONS,
  initialValues,
} from "../../reducerUtilities/actions/surrender/surrenderActions";
import {
  ACTIONS as ILPPARTSURRENDERACTIONS,
  ilpPartSurrenderInitialValue,
} from "../../reducerUtilities/actions/IlpPartSurrender/IlpPartSurrenderAction";
import { SurrenderHStateType } from "../../reducerUtilities/types/surrender/surrenderType";
import { useAppSelector } from "../../redux/app/hooks";
import Notification from "../../utilities/Notification/Notification";
import CustomModal from "../../utilities/modal/CustomModal";
import Assignee from "../assignee/Assignee";
import Payer from "../payer/Payer";
import DirectInvPrem from "./PremiumDirection/PremiumDirection";
import IlpSurrenderModal from "./IlpSurrender/IlpSurrenderModal";
import IlpTopupModal from "./IlpTopupModal/IlpTopupModal";
import AdjPremModal from "./adjPremModal/AdjPremModal";
import ComponentModal from "./componentModal/ComponentModal";
import styles from "./csmmTable.module.css";
import FreqChangeModal from "./freqChangeModal/FreqChangeModal";
import FreqQuoteModal from "./freqQuoteModal/FreqQuoteModal";
import MaturityModal from "./maturityModal/MaturityModal";
import OwnerModal from "./ownerModal/OwnerModal";
import PolReinModal from "./polReinModal/PolReinModal";
import SaChangeModal from "./saChangeModal/SaChangeModal";
import SurrenderModal from "./surrenderModal/SurrenderModal";
import { getBusinessDateApi } from "./surrenderModal/surrenderApi";
import TranReversalModal from "./tranReversalModal/TranReversalModal";
import { useBusinessDate } from "../contexts/BusinessDateContext";
import IlpFundSwitchModal from "./IlpFundSwitchModal/IlpFundSwitchModal";
import SpecialRevivalModal from "./specialRevival/SpecialRevivalModal";
import PartSurrender from "./partSurrender/PartSurrender";
import PremiumDirection from "./PremiumDirection/PremiumDirection";
import NomineeModal from "../nominee/nomineeModel/NomineeModal";
import ChangeAgencyModal from "./changeAgencyModal/ChangeAgencyModal";
import BillTypeChangeModal from "./billTypeChange/BillTypeChangeModal";
// import SaveFuneral from "./funeralModel/SaveFuneral";
// import ApprovalFuneralModal from "./approvalFXModel/ApprovalFuneralModel";

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

  const [nomineesOpen, setNomineesOpen] = useState(false);

  const handleNomineeOpen = () => {
    setNomineesOpen(true);
  };
  const handleNomineeClose = () => {
    setNomineesOpen(false);
  };

  const [nomineeClientOpen, setNomineeClientOpen] = useState(false);

  const handleNomineeClientOpen = () => {
    setNomineeClientOpen(true);
  };
  const handleNomineeClientClose = () => {
    setNomineeClientOpen(false);
  };

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
  // const companyId = useAppSelector(
  //   (state) => state.users.user.message.companyId
  // );

  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  const userId = useAppSelector((state) => state.users.user.message.id);
  // const [businessData, setBusinessData] = useState<any>({});
  // const getBusinessDate = (companyId: number, userId: number) => {
  //   return getBusinessDateApi(companyId, userId)
  //     .then((resp) => {
  //       setBusinessData(resp.data);
  //     })
  //     .catch((err) => err.message);
  // };

  // useEffect(() => {
  //   getBusinessDate(companyId, userId);
  //   return () => {};
  // }, []);

  const reducer = (state: SurrenderHStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case SURRENDERACTIONS.COMMITOPEN:
        return {
          ...state,
          commitOpen: true,
        };
      case SURRENDERACTIONS.COMMITCLOSE:
        return {
          ...state,
          Function: "Save",
          commitOpen: false,
        };
      case SURRENDERACTIONS.SURRENDEROPEN:
        setPolicyID(action.payload);
        return {
          ...state,
          EffectiveDate: businessDate,
          surrenderOpen: true,
        };
      case SURRENDERACTIONS.SURRENDERCLOSE:
        state = initialValues;
        getData();
        return {
          ...state,
          surrenderOpen: false,
        };

      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };

  let [surrenderState, surrenderDispatch] = useReducer(reducer, initialValues);

  const ilpSurrender = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case ILPSURRENDERACTIONS.COMMITOPEN:
        return {
          ...state,
          commitOpen: true,
        };
      case ILPSURRENDERACTIONS.COMMITCLOSE:
        return {
          ...state,
          Function: "Commit",
          commitOpen: false,
        };
      case ILPSURRENDERACTIONS.ILPSURRENDEROPEN:
        setPolicyID(action.payload);
        return {
          ...state,
          EffectiveDate: businessDate,
          SurrDate: businessDate,
          ilpsurrenderOpen: true,
        };
      case ILPSURRENDERACTIONS.ILPSURRENDERCLOSE:
        state = initialValues;
        getData();
        return {
          ...state,
          ilpsurrenderOpen: false,
        };

      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };

  let [ilpsurrenderState, ilpsurrenderDispatch] = useReducer(
    ilpSurrender,
    ilpSurrenderInitialValue
  );

  const ilpPartSurrender = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case ILPPARTSURRENDERACTIONS.COMMITOPEN:
        return {
          ...state,
          commitOpen: true,
        };
      case ILPPARTSURRENDERACTIONS.COMMITCLOSE:
        return {
          ...state,
          Function: "Commit",
          commitOpen: false,
        };
      case ILPPARTSURRENDERACTIONS.ILPPARTSURRENDEROPEN:
        setPolicyID(action.payload);
        return {
          ...state,
          EffectiveDate: businessDate,
          SurrDate: businessDate,
          ilppartsurrenderOpen: true,
        };
      case ILPPARTSURRENDERACTIONS.ILPPARTSURRENDERCLOSE:
        state = initialValues;
        getData();
        return {
          ...state,
          ilppartsurrenderOpen: false,
        };

      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };

  let [ilppartsurrenderState, ilppartsurrenderDispatch] = useReducer(
    ilpPartSurrender,
    ilpPartSurrenderInitialValue
  );

  const maturity = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case MATURITYACTIONS.COMMITOPEN:
        return {
          ...state,
          commitOpen: true,
        };
      case MATURITYACTIONS.COMMITCLOSE:
        return {
          ...state,
          Function: "Commit",
          commitOpen: false,
        };
      case MATURITYACTIONS.MATURITYOPEN:
        setPolicyID(action.payload);
        return {
          ...state,
          EffectiveDate: businessDate,
          maturityOpen: true,
        };
      case MATURITYACTIONS.MATURITYCLOSE:
        state = maturityInitialValue;
        getData();
        return {
          ...state,
          maturityOpen: false,
        };

      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };
  let [maturityState, maturityDispatch] = useReducer(
    maturity,
    maturityInitialValue
  );

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
  const [isTranReversal, setIsTranReversal] = useState(false);
  const [isAdjPrem, setIsAdjPrem] = useState(false);
  const [isAgency, setIsAgency] = useState(false);
  const [isBillType, setIsBillType] = useState(false);
  const [isTopup, setisTopup] = useState(false);
  const [isFundSwitch, setisFundSwitch] = useState(false);

  const [isPolRein, setIsPolRein] = useState(false);
  //const [isSurrender, setIsSurrender] = useState(false);
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
    if (isSave.current) {
      invalidatca();
    }
  };
  const [selectedAgencyId, SetselectedAgencyId] = useState("");
  const [agentClientData, SetagentClientData] = useState("");
  const [agChange, setagChange] = useState<any>({
    NewAgent: "",
    TerminationReason: "",
  });
  const agencyOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsAgency(true);
  };
  const agencyClose = () => {
    setIsAgency(false);
    SetselectedAgencyId("");
    SetagentClientData("");
    setagChange("");

    if (isSave.current) {
      invalidatca();
    }
  };

  //
  const [payingAuthorityId, SetpayingAuthorityId] = useState("");

  const [billtypeChange, setbilltypeChange] = useState<any>({
    NewBillType: "",
    PayingAuthority: "",
  });
  const billTypeOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsBillType(true);
  };
  const billTypeClose = () => {
    setIsBillType(false);
    setbilltypeChange("");

    if (isSave.current) {
      invalidatca();
    }
  };

  const polReinOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setIsPolRein(true);
  };
  const polReinClose = () => {
    setIsPolRein(false);
  };

  // const surrenderOpen = (policyId: number) => {
  //   setPolicyID(policyId);
  //   setIsSurrender(true);
  // };
  // const surrenderClose = () => {
  //   setIsSurrender(false);
  //   surrenderState = initialValues;
  // };

  const [polenqData, setPolenqData] = useState("");
  const getPolEnq = (id: number) => {
    axios
      .get(`http://localhost:3000/api/v1/customerservice/polheaderenq/${id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setPolenqData(resp?.data?.PolicyHeaderEnq);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPolEnq(PolicyID);
    return () => {};
  }, [isAdjPrem, isPolRein, isTopup, isFundSwitch, isAgency, isBillType]);

  const clientMenuClick = (value: any) => {
    switch (value.Action) {
      case "Nominee":
        // dispatch({
        //   type: ACTIONS.NOMINEEOPEN,
        //   payload: enquiryRecord?.current,
        // });
        handleNomineeOpen();
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
      case "AgencyChange":
        agencyOpen(policyId.current, value);
        handleClose();
        break;

      case "BillTypeChange":
        billTypeOpen(policyId.current, value);
        handleClose();
        break;
      case "Surrender":
        surrenderDispatch({ type: SURRENDERACTIONS.SURRENDEROPEN });
        handleClose();
        break;
      case "Reinstatement":
        polReinOpen(policyId.current, value);
        handleClose();
        break;
      case "Maturity":
        maturityDispatch({ type: MATURITYACTIONS.MATURITYOPEN });
        handleClose();
        break;
      case "IlpTopup":
        ilpTopupOpen(policyId.current, value);
        handleClose();
        break;
      case "PremiumDirection":
        directInvPremOpen(policyId.current, value);
        handleClose();
        break;
      case "IlpSurrender":
        ilpsurrenderDispatch({ type: ILPSURRENDERACTIONS.ILPSURRENDEROPEN });
        handleClose();
        break;
      case "IlpFundSwitch":
        ilpFundSwitchOpen(policyId.current, value);
        handleClose();
        break;
      case "SpecialRevival":
        splrevOpen(policyId.current, value);
        handleClose();
        break;
      case "IlpPartSurrender":
        ilppartsurrenderDispatch({
          type: ILPPARTSURRENDERACTIONS.ILPPARTSURRENDEROPEN,
        });
        handleClose();
        break;
      default:
        return;
    }
  };

  const [isSaChange, setisSaChange] = useState(false);
  const [issplrev, setissplRev] = useState(false);
  const [isComponent, setisComponent] = useState(false);
  const [isDirectInvPrem, setisDirectInvPrem] = useState(false);
  const [saChangeMenu, setsaChangeMenu] = useState<any>("");
  const [componentMenu, setcomponentMenu] = useState<any>("");
  const [ilpMenu, setilpMenu] = useState<any>("");
  const [saChangeObj, setsaChangeObj] = useState<any>("");
  const [saChangeBenefits, setsaChangeBenefits] = useState<any>([]);
  const [surrenderBenefits, setsurrenderBenefits] = useState<any>([]);
  const [maturityBenefits, setmaturityBenefits] = useState<any>([]);

  const isSave = useRef(false);

  console.log(PolicyID, "Barath", policyId.current);

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
        `http://localhost:3000/api/v1/customerservice/changesa/${PolicyID}`,
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
        `http://localhost:3000/api/v1/customerservice/changesa/${PolicyID}`,
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

  const invalidatesa = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/invalidatesa/${PolicyID}`,
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
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };
  const postComponentAdd = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/addcomponent/${PolicyID}`,
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
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const saveComponent = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/addcomponent/${PolicyID}`,
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
    setcomponentBenefits([]);
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

    if (isSave.current) {
      invalidatesa();
    }
  };

  const splrevOpen = (policyId: number, value: any) => {
    setissplRev(true);
    setPolicyID(policyId);
  };
  const splrevClose = () => {
    setissplRev(false);
  };

  const [SpRev, setSpRev] = useState<any>({});
  const getspecialrevival = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/splrevival`,
        {
          Function: "Calculate",
          Policy: PolicyID.toString(),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setSpRev(resp.data?.SpecialRevival);
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

  useEffect(() => {
    if (issplrev) {
      getspecialrevival();
    }
    return () => {};
  }, [issplrev]);

  const savespecialrevival = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/splrevival`,
        {
          Function: "Save",
          Policy: PolicyID.toString(),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setSpRev(resp.data?.SpecialRevival);

        splrevClose();
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

  const [premCalcType, setpremCalcType] = useState("");
  const [inverstPremData, setinverstPremData] = useState<any>({});
  const [iplBenefits, setilpBenefits] = useState<any>([]);
  const [iplFundData, setilpFundData] = useState<any>([]);
  const getPolicyWithBenefitAndFund = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/getpolwithbenefunds/${PolicyID}/${premCalcType}`,

        { withCredentials: true }
      )
      .then((resp) => {
        setinverstPremData(resp.data?.Policy);
        setilpBenefits(resp.data?.Policy.Benefits);
        setilpFundData(resp.data?.Policy.IlpFunds);
        // isSave.current = false;
      })
      .catch((err) => {
        return err;
      });
  };
  const [bcoverage, setbcoverage] = useState<any>([]);
  const [ilpAllowed, setilpAllowed] = useState([]);
  const getilpAllowedFunds = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/ilpservices/ilpallowedfundsget`,
        {
          CompanyID: parseInt(companyId),

          BCoverage: bcoverage,

          EffectiveDate: moment(iplFundData[0]?.EffectiveDate)
            .format("YYYYMMDD")
            .toString(),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setilpAllowed(resp.data?.ILP1);
        // isSave.current = false;
      })
      .catch((err) => {
        return err;
      });
  };
  useLayoutEffect(() => {
    getilpAllowedFunds();
    return () => {};
  }, [bcoverage]);

  const [benId, setbenId] = useState("");
  const [ClientID, setClientID] = useState<any>([]);

  const [ilpSelectedFund, setilpSelectedFund] = useState([]);
  const [percentageData, setpercentageData] = useState([]);
  const checkIlpFunds = () => {
    return axios
      .post(
        `http://localhost:3000/api/v1/ilpservices/premiumdirection`,
        {
          Function: "Check",
          CompanyID: companyId,
          PolicyID: inverstPremData.ID,
          BenefitID: benId,
          ClientID: ClientID,
          EffectiveDate: moment(iplFundData[0]?.EffectiveDate)
            .format("YYYYMMDD")
            .toString(),
          Funds: ilpAllowed
            .filter(
              (data: any) =>
                data.FundPercentage !== null &&
                data.FundPercentage !== undefined &&
                data.FundPercentage !== ""
            )
            .map((data: any) => ({
              ...data,
              FundCode: data.FundCode,
              FundType: data.FundType,
              FundPercentage: parseFloat(data?.FundPercentage),
              FundCurr: data.FundCurr,
            })),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        isSave.current = true;

        setNotify({
          isOpen: true,
          message: `changed IlpFund equal to 100`,
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

  const saveIlpFunds = () => {
    return axios
      .post(
        `http://localhost:3000/api/v1/ilpservices/premiumdirection`,
        {
          Function: "Save",
          CompanyID: companyId,
          PolicyID: inverstPremData.ID,
          BenefitID: benId,
          ClientID: ClientID,
          EffectiveDate: moment(iplFundData[0]?.EffectiveDate)
            .format("YYYYMMDD")
            .toString(),
          Funds: ilpAllowed
            .filter(
              (data: any) =>
                data.FundPercentage !== null &&
                data.FundPercentage !== undefined &&
                data.FundPercentage !== ""
            )
            .map((data: any) => ({
              ...data,
              FundCode: data.FundCode,
              FundType: data.FundType,
              FundPercentage: parseFloat(data?.FundPercentage),
              FundCurr: data.FundCurr,
            })),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        isSave.current = false;
        // setilpSelectedFund(resp.data?.result);
        setNotify({
          isOpen: true,
          message: `Ilp Fund Changed Successfully`,
          type: "success",
        });
        directInvPremClose();
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

  const directInvPremOpen = (policyId: number, value: any) => {
    setisDirectInvPrem(true);
    setilpMenu(value);
    setPolicyID(policyId);
    setpremCalcType("U");
  };
  const directInvPremClose = () => {
    setisDirectInvPrem(false);
    setilpSelectedFund([]);
    if (isSave.current) {
      invalidatca();
    }
  };
  useEffect(() => {
    getPolicyWithBenefitAndFund();
    setbcoverage("");

    return () => {};
  }, [isDirectInvPrem]);

  useEffect(() => {
    if (isDirectInvPrem) {
      getilpAllowedFunds();
    } else return;

    return () => {};
  }, [isDirectInvPrem === true]);

  const ilpTopupOpen = (policyId: number, value: any) => {
    setisTopup(true);
    setcomponentMenu(value);
    //setilpfunc("Init")
    setPolicyID(policyId);
  };
  const ilpTopupClose = () => {
    setisTopup(false);
    setcompleted(false);
  };

  const ilpFundSwitchOpen = (policyId: number, value: any) => {
    setisFundSwitch(true);
    setcomponentMenu(value);
    //setilpfunc("Init")
    setPolicyID(policyId);
  };
  const ilpFundSwitchClose = () => {
    setisFundSwitch(false);
    setcompleted(false);
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
        `http://localhost:3000/api/v1/customerservice/invalidateca/${PolicyID}`,
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
            {/* <th>Benefit</th> */}
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
        getData={getData}
      />

      <BillTypeChangeModal
        open={isBillType}
        handleClose={billTypeClose}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        data={polenqData}
        getData={getData}
        payingAuthorityId={payingAuthorityId}
        SetpayingAuthorityId={SetpayingAuthorityId}
        agentClientData={agentClientData}
        SetagentClientData={SetagentClientData}
        billtypeChange={billtypeChange}
        setbilltypeChange={setbilltypeChange}
      />
      <ChangeAgencyModal
        open={isAgency}
        handleClose={agencyClose}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        data={polenqData}
        getData={getData}
        selectedAgencyId={selectedAgencyId}
        SetselectedAgencyId={SetselectedAgencyId}
        agentClientData={agentClientData}
        SetagentClientData={SetagentClientData}
        agChange={agChange}
        setagChange={setagChange}
      />
      <IlpTopupModal
        open={isTopup}
        handleClose={ilpTopupClose}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        data={polenqData}
        getData={getData}
        polid={PolicyID}
      />
      <IlpFundSwitchModal
        open={isFundSwitch}
        handleClose={ilpFundSwitchClose}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        data={polenqData}
        getData={getData}
        polid={PolicyID}
      />
      <PartSurrender
        getData={getData}
        ilppartsurrenderState={ilppartsurrenderState}
        ilppartsurrenderDispatch={ilppartsurrenderDispatch}
        polid={PolicyID}
        policyRecord={enquiryRecord.current}
      />
      <PolReinModal
        open={isPolRein}
        handleClose={polReinClose}
        completed={completed}
        setcompleted={setcompleted}
        func={func}
        setfunc={setfunc}
        data={polenqData}
        getData={getData}
      />
      <SurrenderModal
        policyId={policyId}
        surrenderBenefits={surrenderBenefits}
        setsurrenderBenefits={setsurrenderBenefits}
        isSave={isSave?.current}
        policyRecord={enquiryRecord.current}
        surrenderState={surrenderState}
        surrenderDispatch={surrenderDispatch}
        getData={getData}
      />
      <IlpSurrenderModal
        policyId={policyId}
        surrenderBenefits={surrenderBenefits}
        setsurrenderBenefits={setsurrenderBenefits}
        isSave={isSave?.current}
        policyRecord={enquiryRecord.current}
        ilpsurrenderState={ilpsurrenderState}
        ilpsurrenderDispatch={ilpsurrenderDispatch}
        getData={getData}
      />
      <MaturityModal
        policyId={policyId}
        maturityBenefits={maturityBenefits}
        setmaturityBenefits={setmaturityBenefits}
        isSave={isSave?.current}
        policyRecord={enquiryRecord.current}
        maturityState={maturityState}
        maturityDispatch={maturityDispatch}
        getData={getData}
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
      <SpecialRevivalModal
        open={issplrev}
        handleClose={splrevClose}
        SpRev={SpRev}
        savespecialrevival={savespecialrevival}
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
      <PremiumDirection
        open={isDirectInvPrem}
        handleClose={directInvPremClose}
        inverstPremData={inverstPremData}
        iplBenefits={iplBenefits}
        setilpBenefits={setilpBenefits}
        iplFundData={iplFundData}
        setilpFundData={setilpFundData}
        setilpAllowed={setilpAllowed}
        ilpAllowed={ilpAllowed}
        ilpSelectedFund={ilpSelectedFund}
        setilpSelectedFund={setilpSelectedFund}
        checkIlpFunds={checkIlpFunds}
        saveIlpFunds={saveIlpFunds}
        percentageData={percentageData}
        setpercentageData={setpercentageData}
        isSave={isSave?.current}
        polid={PolicyID}
        setbenId={setbenId}
        benId={benId}
        setClientID={setClientID}
        setbcoverage={setbcoverage}
        bcoverage={bcoverage}
      />
      <NomineeModal
        open={nomineesOpen}
        handleClose={handleNomineeClose}
        policyId={policyId.current}
        policyRecord={enquiryRecord.current}
        data={data}
        clientOpen={nomineeClientOpen}
        nomineeClient={handleNomineeClientOpen}
        clientClose={handleNomineeClientClose}
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
