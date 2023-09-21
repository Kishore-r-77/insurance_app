import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Paper } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import moment from "moment";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  ACTIONS as MATURITYACTIONS,
  maturityInitialValue,
} from "../../reducerUtilities/actions/maturity/maturityAction";
import {
  ACTIONS as SURRENDERACTIONS,
  initialValues,
} from "../../reducerUtilities/actions/surrender/surrenderActions";
import { SurrenderHStateType } from "../../reducerUtilities/types/surrender/surrenderType";
import { useAppSelector } from "../../redux/app/hooks";
import Notification from "../../utilities/Notification/Notification";
import CustomModal from "../../utilities/modal/CustomModal";
import Assignee from "../assignee/Assignee";
import Payer from "../payer/Payer";
import AdjPremModal from "./adjPremModal/AdjPremModal";
import ComponentModal from "./componentModal/ComponentModal";
import styles from "./claimsTable.module.css";
import FreqChangeModal from "./freqChangeModal/FreqChangeModal";
import FreqQuoteModal from "./freqQuoteModal/FreqQuoteModal";
import MaturityModal from "./maturityModal/MaturityModal";
import OwnerModal from "./ownerModal/OwnerModal";
import PolReinModal from "./polReinModal/PolReinModal";
import SaChangeModal from "./saChangeModal/SaChangeModal";
import SurrenderModal from "./surrenderModal/SurrenderModal";
import TranReversalModal from "./tranReversalModal/TranReversalModal";
import ApprovalFuneralModal from "./approvalFXModel/ApprovalFuneralModel";
import FuneralModel from "./funeralModel/FuneralModel";
import IBenefitModal from "./incomeBenefit/IBenefitModal";
import APModal from "./incomeBenefit/Apmodal";
import CIapprove from "./criticalModal/CIapprove";
import CriticalModal from "./criticalModal/Critical";

function ClaimsTable({
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

  const [claimMenuData, setclaimMenuData] = useState([]);
  const clientMenu = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "P0044",
          date: "20220101",
          item: "CLAIMMM",
          company_id: companyId,
        },
      })
      .then((resp) => {
        setclaimMenuData(resp.data?.AllowedMenus);
      })
      .catch((err) => {
        
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

  const reducer = (state: SurrenderHStateType, action: any) => {
    console.log(state, "surrender State");
    console.log(action.type, "type");
    console.log(ACTIONS, "ACTIONS.SURRENDEROPEN");
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
          Function: "Commit",
          commitOpen: false,
        };
      case SURRENDERACTIONS.SURRENDEROPEN:
        setPolicyID(action.payload);
        return {
          ...state,
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

        setPolenqData("");
      });
  };

  useEffect(() => {
    getPolEnq(PolicyID);
    return () => {};
  }, [isAdjPrem, isPolRein]);

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
      //Funeral modification
      case "Funeral":
        funeralOpen(policyId.current, value);
        handleClose();
        break;
      case "ApprovalFX":
        ApprovalfuneralOpen(policyId.current, value);
        handleClose();
        break;
      //Funeral modification
      case "IBenefit":
        IBenefitOpen(policyId.current, value);
        handleClose();
        break;
      case "IBApprove":
        IBapOpen(policyId.current, value);
        handleClose();
        break;
      case "CriticalIllness":
        criticalOpen(policyId.current, value);
        handleClose();
        break;
      case "ApprovalCI":
        ApproveCIopen(policyId.current, value);
        handleClose();
        break;
      default:
        return;
    }
  };
  ///open ib

  const [isIBenefit, setisIBenefit] = useState(false);
  const [IBenefitData, setIBenefitData] = useState<any>("");
  const [IBenefits, setIBenefits] = useState<any>([]);
  const [IbBenefits, setIbBenefits] = useState<any>([]);
  const [benefitcheck, setbenefitcheck] = useState<any>({});
  const [apBenefits, setapBenefits] = useState<any>([]);
  const initialbenefitentry = {
    PayFrequency: "",
    IncidentDate: "",
    ReceivedDate: "",
  };
  const [benefitentry, setbenefitentry] = useState(initialbenefitentry);
  const [isIBnext, setisIBnext] = useState(false);
  const [saveisIBopen, setsaveisIBopen] = useState(false);

  const saveibenefitOpen = () => {
    setsaveisIBopen(true);
    setisIBnext(true);
  };
  const saveibenefitClose = () => {
    setsaveisIBopen(false);
    setisIBnext(false);
  };
  ////////

  //incomebenefit

  const [savebenefitobj, setsavebenefitobj] = useState<any>({});
  const postIBenefit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/ibcreate/${PolicyID}/${benefitcheck.ID}`,
        {
          CompanyID: companyId,
          BenefitID: benefitcheck.ID,

          //PaidDate: moment(benefitentry.PaidDate).format("YYYYMMDD").toString(),
          IncidentDate: moment(benefitentry.IncidentDate)
            .format("YYYYMMDD")
            .toString(),
          ReceivedDate: moment(benefitentry.ReceivedDate)
            .format("YYYYMMDD")
            .toString(),
          PolicyID: IBenefitData.ID,

          PayFrequency: IBenefitData.PFreq,
          BCoverage: benefitcheck.BCoverage,

          BSumAssured: benefitcheck.BSumAssured,

          Function: "Check",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setsavebenefitobj(resp.data.IB);
        isSave.current = true;
        setisIBnext(false);
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
  // save incomebenefit
  const saveIBenefit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/ibcreate/${PolicyID}/${benefitcheck.ID}`,
        {
          CompanyID: companyId,
          PolicyID: savebenefitobj.PolicyID,
          BenefitID: savebenefitobj.BenefitID,
          BCoverage: savebenefitobj.BCoverage,
          Seqno: savebenefitobj.Seqno,
          PayFrequency: savebenefitobj.PayFrequency,
          Percentage: savebenefitobj.Percentage,
          BSumAssured: savebenefitobj.BSumAssured,
          EffectiveDate: savebenefitobj.EffectiveDate,
          IncidentDate: savebenefitobj.IncidentDate,
          ReceivedDate: savebenefitobj.ReceivedDate,
          PaidToDate: savebenefitobj.PaidToDate,
          BStatusCode: savebenefitobj.BStatusCode,
          ApprovalFlag: savebenefitobj.ApprovalFlag,
          CertificateExistranceFlag: savebenefitobj.CertificateExistranceFlag,
          CertificateExistranceDate: savebenefitobj.CertificateExistranceDate,
          CertificateExistranceRevDate:
            savebenefitobj.CertificateExistranceRevDate,
          NextPayDate: savebenefitobj.NextPayDate,
          ClaimAmount: savebenefitobj.ClaimAmount,
          BStartDate: savebenefitobj.BStartDate,
          TotalAmount: savebenefitobj.TotalAmount,
          PaidDate: savebenefitobj.PaidDate,
          Function: "Save",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        isSave.current = false;
        IBenefitClose();
        saveibenefitClose();
        setbenefitentry(initialbenefitentry);

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
  //
  const handleIBIncidentDate = (date: any) => {
    setbenefitentry((prev) => ({ ...prev, IncidentDate: date }));
  };
  const handleIBReceivedDate = (date: any) => {
    setbenefitentry((prev) => ({ ...prev, ReceivedDate: date }));
  };

  // const [policyWithBenefitData, setpolicyWithBenefitData] = useState([]);
  const handleIBenefitchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setbenefitentry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //get policy
  // const getPolicywithBenefit = (policyId: any) => {
  //   axios
  //     .get(
  //       `http://localhost:3000/api/v1/deathservices/getpolwithbenefits/${policyId}`,
  //       { withCredentials: true }
  //     )
  //     .then((resp) => {
  //       setIBenefitData(resp.data?.Policy);
  //       setIBenefits(resp?.data?.Policy?.Benefits);
  //       setapBenefits(resp?.data?.Policy?.IBenefits);
  //     })
  //     .catch((err) => err.message);
  // };
  const [ibclaimType, setibclaimType] = useState("");
  const getPolicywithBenefit = (policyId: any, claimType: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/getpolwithbenefitstest/${policyId}/${ibclaimType}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setIBenefitData(resp.data?.Policy);
        setIBenefits(resp.data?.Claims);
        setapBenefits(resp?.data?.Policy?.IBenefits);
      })
      .catch((err) => err.message);
  };
  useEffect(() => {
    getPolicywithBenefit(PolicyID, ibclaimType);

    return () => {};
  }, [isIBenefit]);

  // open/close
  const IBenefitOpen = (policyId: number, value: any) => {
    setisIBenefit(true);
    setPolicyID(policyId);
    setibclaimType("I");
    getPolicywithBenefit(policyId, ibclaimType);
  };
  const IBenefitClose = () => {
    setisIBenefit(false);
    setbenefitentry(initialbenefitentry);
  };

  const [isapopen, setisapopen] = useState(false);

  //approval function
  const IBapOpen = (policyId: number, value: any) => {
    setisapopen(true);
    setPolicyID(policyId);
    setibclaimType("I");
    getPolicywithBenefit(policyId, ibclaimType);
  };
  const IBapClose = () => {
    setisapopen(false);
    setbenefitentry(initialbenefitentry);

    if (isSave.current) {
      //invalidateIB();
    }
  };

  useEffect(() => {
    getPolicywithBenefit(PolicyID, claimType);

    return () => {};
  }, [isapopen]);
  // close ib
  //Funeral modification
  const [isFuneral, setisFuneral] = useState(false);
  const [isApprovalFuneral, setisApprovalFuneral] = useState(false);
  const [funeralObj, setfuneralobj] = useState<any>("");
  const [funeralMenu, setfuneralMenu] = useState<any>("");
  const [nomineeObj, setnomineeobj] = useState<any>([]);
  const [funeralBenefits, setfuneralBenefits] = useState<any>([]);
  const [funeralcheck, setfuneralcheck] = useState<any>({});
  const initialfuneralentry = {
    CriticalType: "",
    IncidentDate: "",
    ReceivedDate: "",
  };
  const [criticalIllness, setcriticalIllness] = useState<any>([]);
  const [funeralentry, setfuneralentry] = useState(initialfuneralentry);
  const [isnext, setisnext] = useState(false);
  const [saveisfuneralOpen, setsaveisfuneralOpen] = useState(false);

  const savefuneralOpen = () => {
    setsaveisfuneralOpen(true);
    setisnext(true);
  };

  const savefuneralClose = () => {
    setsaveisfuneralOpen(false);
    setisnext(false);
  };
  //Funeral modification
  const funeralOpen = (policyId: number, value: any) => {
    setisFuneral(true);
    setfuneralMenu(value);
    setPolicyID(policyId);
    setclaimType("F");
    getnomineebypolicy(policyId);
  };
  useEffect(() => {
    getpolicywithclaimbenefit(PolicyID, claimType);

    return () => {};
  }, [isFuneral]);
  const handleIncidentDate = (date: any) => {
    setfuneralentry((prev) => ({ ...prev, IncidentDate: date }));
  };
  const handleReceivedDate = (date: any) => {
    setfuneralentry((prev) => ({ ...prev, ReceivedDate: date }));
  };

  const handlefuneralchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setfuneralentry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const funeralClose = () => {
    setisFuneral(false);
    setfuneralentry(initialfuneralentry);
  };
  const ApprovalfuneralOpen = (policyId: number, value: any) => {
    setisApprovalFuneral(true);
    setfuneralMenu(value);
    setPolicyID(policyId);
    setclaimType("F");
    getpolicywithclaimbenefit(policyId, claimType);
    // getpolicywithbenefit(policyId);
    getnomineebypolicy(policyId);
  };
  const ApprovalfuneralClose = () => {
    setisApprovalFuneral(false);
    setfuneralentry(initialfuneralentry);
  };
  useEffect(() => {
    getpolicywithclaimbenefit(PolicyID, claimType);

    return () => {};
  }, [isApprovalFuneral]);
  const [claimType, setclaimType] = useState("");
  const getpolicywithclaimbenefit = (policyId: any, claimType: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/getpolwithbenefitstest/${policyId}/${claimType}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setfuneralobj(resp.data?.Policy);
        setfuneralBenefits(resp?.data?.Claims);
        setcriticalIllness(resp?.data?.Policy?.CriticalIllnesss);
      })
      .catch((err) => err.message);
  };
  const getnomineebypolicy = (policyId: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/nomineesbypol/${policyId}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setnomineeobj(resp.data?.Nominees);
      })
      .catch((err) => err.message);
  };
  const [savefuneralobj, setsavefuneralobj] = useState<any>({});
  const postfuneral = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/fxcreate/${PolicyID}/${funeralcheck.ID}`,
        {
          BenefitID: funeralcheck.ID,
          CompanyID: companyId,
          PolicyID: funeralObj.ID,
          CriticalType: funeralentry.CriticalType,
          BSumAssured: funeralcheck.BSumAssured,
          IncidentDate:
            funeralentry.IncidentDate.length === 0
              ? ""
              : moment(funeralentry.IncidentDate).format("YYYYMMDD").toString(),
          ReceivedDate:
            funeralentry.ReceivedDate.length === 0
              ? ""
              : moment(funeralentry.ReceivedDate).format("YYYYMMDD").toString(),
          BStatusCode: funeralcheck.BStatusCode,
          // Percentage: nomineeObj[0].NomineePercentage,
          ClientID: nomineeObj[0]?.ClientID,
          Function: "Check",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setisnext(false);
        setsavefuneralobj(resp.data.FE);
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
  const savefuneral = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/fxcreate/${PolicyID}/${funeralcheck.ID}`,
        {
          CompanyID: companyId,
          PolicyID: savefuneralobj.PolicyID,
          BenefitID: savefuneralobj.BenefitID,
          CriticalType: savefuneralobj.CriticalType,
          BSumAssured: savefuneralobj.BSumAssured,
          EffectiveDate: savefuneralobj.EffectiveDate,
          IncidentDate: moment(savefuneralobj.IncidentDate).format("YYYYMMDD"),
          ReceivedDate: moment(savefuneralobj.ReceivedDate).format("YYYYMMDD"),
          PaidToDate: moment(savefuneralobj.ReceivedDate).format("YYYYMMDD"),
          BStatusCode: savefuneralobj.BStatusCode,
          ApprovalFlag: savefuneralobj.ApprovalFlag,
          ClaimAmount: savefuneralobj.ClaimAmount,
          Percentage: savefuneralobj.NomineePercentage,
          ClientID: savefuneralobj.ClientID,
          Function: "Save",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        isSave.current = false;
        funeralClose();
        savefuneralClose();
        setfuneralentry(initialfuneralentry);
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

  /// CRITICAL ILLNESS
  const [isCritical, setisCritical] = useState(false);
  const [isApproveCI, setisApproveCI] = useState(false);
  const [saveisCIopen, setsaveisCIopen] = useState(false);
  const [isCInext, setisCInext] = useState(false);
  const [criticalData, setcriticalData] = useState<any>("");
  const [criticalMenu, setcriticalMenu] = useState<any>("");
  const [checkResponse, setcheckResponse] = useState<any>({});
  const [criticalBenefits, setcriticalBenefits] = useState<any>([]);
  const [policyWithBenefitData, setpolicyWithBenefitData] = useState([]);
  const [apCIBenefits, setapCIBenefits] = useState<any>([]);
  const [checkbody, setcheckbody] = useState<any>("");
  const initialcriticalentry = {
    CriticalType: "",
    IncidentDate: "",
    ReceivedDate: "",
  };
  const [criticalentry, setcriticalentry] = useState(initialcriticalentry);
  const [ciclaimtype, setciclaimtype] = useState("");
  const [isSaveopen, setissaveopen] = useState(false);
  const [BenefitID, setBenefitID] = useState();

  const saveCriticalopen = () => {
    setsaveisCIopen(true);
    setisCInext(true);
  };
  const saveCriticalclose = () => {
    setsaveisCIopen(false);
  };

  const handleadditional = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setcriticalentry((prev) => ({ ...prev, [name]: value }));
  };

  const postcritical = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/cicreate/${PolicyID}/${checkbody.ID}`,
        {
          CompanyID: parseInt(criticalData.CompanyID),
          BenefitID: parseInt(checkbody.ID),
          CriticalType: criticalentry.CriticalType,
          BSumAssured: parseInt(checkbody.BSumAssured),
          IncidentDate: moment(criticalentry.IncidentDate).format("YYYYMMDD"),
          PolicyID: parseInt(criticalData.ID),
          ReceivedDate: moment(criticalentry.ReceivedDate).format("YYYYMMDD"),
          PaidToDate: moment(criticalData.PaidToDate).format("YYYYMMDD"),
          BStatusCode: checkbody.BStatus,

          Function: "Check",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setcheckResponse(resp.data.CI);
        isSave.current = true;
        setisCInext(false);
        Saveopen();
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

  const Saveopen = () => {
    setissaveopen(true);
  };
  const Saveclose = () => {
    setissaveopen(false);
  };
  const savecritical = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/cicreate/${PolicyID}/${checkbody.ID}`,
        {
          CompanyID: checkResponse.CompanyID,
          PolicyID: checkResponse.PolicyID,
          BenefitID: checkResponse.BenefitID,
          CriticalType: checkResponse.CriticalType,
          BSumAssured: checkResponse.BSumAssured,
          EffectiveDate: checkResponse.EffectiveDate,
          IncidentDate: checkResponse.IncidentDate,
          ReceivedDate: checkResponse.ReceivedDate,
          PaidToDate: checkResponse.PaidToDate,
          BStatusCode: checkResponse.BStatusCode,
          ApprovalFlag: checkResponse.ApprovalFlag,
          ClaimAmount: checkResponse.ClaimAmount,
          Percentage: checkResponse.Percentage,
          Function: "Save",
        },
        { withCredentials: true }
      )
      .then((resp) => {
        setcriticalData(resp.data?.Policy);
        setcriticalBenefits(resp?.data?.Benefits);
        saveCriticalclose();
        criticalClose();
        setcriticalentry(initialcriticalentry);

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
  const criticalOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setBenefitID(BenefitID);
    setisCritical(true);
    setciclaimtype("C");
    getPolicywithBenefitCI(policyId, ciclaimtype);
  };
  const criticalClose = () => {
    setisCritical(false);
  };
  const ApproveCIopen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setBenefitID(BenefitID);
    setisApproveCI(true);
    getPolicywithBenefitCI(policyId, ciclaimtype);
  };
  const ApproveCIclose = () => {
    setisApproveCI(false);
  };
  // invalid want to change approval

  const getPolicywithBenefitCI = (policyId: any, ciclaimtype: any) => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/getpolwithbenefitstest/${policyId}/${ciclaimtype}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setcriticalData(resp.data?.Policy);
        // setcriticalBenefits(resp?.data?.Policy?.Benefits);
        setcriticalBenefits(resp?.data?.Claims);
        setapCIBenefits(resp?.data?.Policy?.CriticalIllnesss);
      })
      .catch((err) => err.message);
  };
  useEffect(() => {
    getPolicywithBenefitCI(PolicyID, ciclaimtype);

    return () => {};
  }, [isCritical]);

  const handleCIIncidentDate = (date: any) => {
    setcriticalentry((prev) => ({ ...prev, IncidentDate: date }));
  };
  const handleCIReceivedDate = (date: any) => {
    setcriticalentry((prev) => ({ ...prev, ReceivedDate: date }));
    console.log("handleCIReceivedDate", date);
  };
  ///////CLOSE CI

  console.log(surrenderState.surrenderOpen, "surrenderOpen");
  const [isSaChange, setisSaChange] = useState(false);
  const [isComponent, setisComponent] = useState(false);
  const [saChangeMenu, setsaChangeMenu] = useState<any>("");
  const [componentMenu, setcomponentMenu] = useState<any>("");
  const [saChangeObj, setsaChangeObj] = useState<any>("");
  const [saChangeBenefits, setsaChangeBenefits] = useState<any>([]);
  const [surrenderBenefits, setsurrenderBenefits] = useState<any>([]);
  const [maturityBenefits, setmaturityBenefits] = useState<any>([]);

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
        return err;
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
          message: err?.data?.error,
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
                    {claimMenuData.map((clientValue: any) => (
                      <MenuItem onClick={() => clientMenuClick(clientValue)}>
                        {clientValue?.Action}
                      </MenuItem>
                    ))}
                  </Menu>
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
      <TranReversalModal
        open={isTranReversal}
        handleClose={tranReversalClose}
        policyId={PolicyID}
        getPolicyData={getData}
        setNotify={setNotify}
      />
      <IBenefitModal
        open={isIBenefit}
        handleClose={IBenefitClose}
        IBenefitData={IBenefitData}
        IBenefits={IBenefits}
        setIBenefits={setIBenefits}
        postIBenefit={postIBenefit}
        isSave={isSave?.current}
        saveIBenefit={saveIBenefit} // save func
        getData={getData}
        setbenefitcheck={setbenefitcheck}
        benefitentry={benefitentry}
        handleIBenefitchange={handleIBenefitchange}
        setisIBnext={setisIBnext}
        handleIBIncidentDate={handleIBIncidentDate}
        handleIBReceivedDate={handleIBReceivedDate}
        isIBnext={isIBnext}
        savebenefitobj={savebenefitobj}
        benefitcheck={benefitcheck}
        saveibenefitOpen={saveibenefitOpen} //ls
        saveibenefitClose={saveibenefitClose} //
        saveisIBopen={saveisIBopen} //
        apBenefits={apBenefits}
        setNotify={setNotify}
      />
      <APModal
        open={isapopen}
        handleClose={IBapClose}
        IBenefitData={IBenefitData}
        IBenefits={IBenefits}
        setIBenefits={setIBenefits}
        postIBenefit={postIBenefit}
        isSave={isSave?.current}
        saveIBenefit={saveIBenefit} // save func
        getData={getData}
        setbenefitcheck={setbenefitcheck}
        benefitentry={benefitentry}
        handleIBenefitchange={handleIBenefitchange}
        setisIBnext={setisIBnext}
        handleIBIncidentDate={handleIBIncidentDate}
        handleIBReceivedDate={handleIBReceivedDate}
        isIBnext={isIBnext}
        savebenefitobj={savebenefitobj}
        benefitcheck={benefitcheck}
        saveibenefitOpen={saveibenefitOpen} //ls
        saveibenefitClose={saveibenefitClose} //
        saveisIBopen={saveisIBopen} //
        apBenefits={apBenefits}
        setNotify={setNotify}
      />
      {/* //Funeral modification */}
      <FuneralModel
        open={isFuneral}
        handleClose={funeralClose}
        funeralObj={funeralObj}
        nomineeObj={nomineeObj}
        funeralBenefits={funeralBenefits}
        setfuneralBenefits={setfuneralBenefits}
        postfuneral={postfuneral}
        isSave={isSave?.current}
        // savefuneral={savefuneral}
        getData={getData}
        setfuneralcheck={setfuneralcheck}
        handlefuneralchange={handlefuneralchange}
        funeralentry={funeralentry}
        isnext={isnext}
        savefuneralobj={savefuneralobj}
        funeralcheck={funeralcheck}
        savefuneral={savefuneral}
        setisnext={setisnext}
        handleIncidentDate={handleIncidentDate}
        handleReceivedDate={handleReceivedDate}
        savefuneralOpen={savefuneralOpen}
        saveisfuneralOpen={saveisfuneralOpen}
        savefuneralClose={savefuneralClose}
        criticalIllness={criticalIllness}
        setNotify={setNotify}
      />
      <ApprovalFuneralModal
        open={isApprovalFuneral}
        handleClose={ApprovalfuneralClose}
        funeralObj={funeralObj}
        nomineeObj={nomineeObj}
        funeralBenefits={funeralBenefits}
        setfuneralBenefits={setfuneralBenefits}
        postfuneral={postfuneral}
        isSave={isSave?.current}
        getData={getData}
        setfuneralcheck={setfuneralcheck}
        handlefuneralchange={handlefuneralchange}
        funeralentry={funeralentry}
        isnext={isnext}
        savefuneralobj={savefuneralobj}
        funeralcheck={funeralcheck}
        savefuneral={savefuneral}
        setisnext={setisnext}
        handleIncidentDate={handleIncidentDate}
        handleReceivedDate={handleReceivedDate}
        savefuneralOpen={savefuneralOpen}
        saveisfuneralOpen={saveisfuneralOpen}
        savefuneralClose={savefuneralClose}
        criticalIllness={criticalIllness}
        setNotify={setNotify}
      />
      {/* Funeral modification */}
      <CriticalModal
        open={isCritical}
        handleClose={criticalClose}
        criticalData={criticalData}
        criticalBenefits={criticalBenefits}
        setcriticalBenefits={setcriticalBenefits}
        postcritical={postcritical}
        isSave={isSave?.current}
        savecritical={savecritical}
        criticalentry={criticalentry}
        getData={getData}
        policyWithBenefitData={policyWithBenefitData}
        setcheckbody={setcheckbody}
        handleadditional={handleadditional}
        setisCInext={setisCInext}
        handleCIIncidentDate={handleCIIncidentDate}
        handleCIReceivedDate={handleCIReceivedDate}
        isCInext={isCInext}
        checkResponse={checkResponse}
        checkbody={checkbody}
        saveCriticalopen={saveCriticalopen}
        saveCriticalClose={saveCriticalclose}
        saveisCIopen={saveisCIopen}
        apCIBenefits={apCIBenefits}
        setNotify={setNotify}
      />
      <CIapprove
        open={isApproveCI}
        handleClose={ApproveCIclose}
        criticalData={criticalData}
        criticalBenefits={criticalBenefits}
        setcriticalBenefits={setcriticalBenefits}
        postcritical={postcritical}
        isSave={isSave?.current}
        savecritical={savecritical}
        criticalentry={criticalentry}
        getData={getData}
        policyWithBenefitData={policyWithBenefitData}
        setcheckbody={setcheckbody}
        handleadditional={handleadditional}
        setisCInext={setisCInext}
        handleCIIncidentDate={handleCIIncidentDate}
        handleCIReceivedDate={handleCIReceivedDate}
        isCInext={isCInext}
        checkResponse={checkResponse}
        checkbody={checkbody}
        saveCriticalopen={saveCriticalopen}
        saveCriticalClose={saveCriticalclose}
        saveisCIopen={saveisCIopen}
        apCIBenefits={apCIBenefits}
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

export default ClaimsTable;
