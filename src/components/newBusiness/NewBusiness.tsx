import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/policy/policyActions";
import { PolicyStateType } from "../../reducerUtilities/types/policy/policyTypes";
import { useAppSelector } from "../../redux/app/hooks";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import CustomModal from "../../utilities/modal/CustomModal";
import NotificationModal from "../../utilities/modal/NotificationModal";
import NewBussinessTable from "./NewBussinessTable";
import styles from "./newBusiness.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./newBusinessApis/newBusinessApis";
import PolicyModal from "../policy/policyModal/PolicyModal";
import PolicyValidate from "./policyValidate/PolicyValidate";
import Nominee from "../nominee/nomineeTable/Nominee";

import Notification from "../../utilities/Notification/Notification";
import { getBenefitsByPolicies } from "../policy/policyApis/policyApis";
import Benefit from "../policy/policyModal/benefit/Benefit";
import PolicyEnquiry from "../policy/policyModal/PolicyEnquiry";

function NewBusiness({ modalFunc }: any) {
  const size = "xl";
  //data from getall api
  const [data, setData] = useState([]);

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [benefitsData, setbenefitsData] = useState([
    {
      ClientID: 0,
      BStartDate: "",
      BTerm: 0,
      BPTerm: 0,
      BCoverage: "",
      BSumAssured: 0,
      Interest: 0,
    },
  ]);

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: PolicyStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        if (action.fieldName === "Interest") {
          console.log(action.payload, "On change interest");
          //interest.current = action.payload;
          setinterest(action.payload);
        } else {
          setRecord((prev: any) => ({
            ...prev,
            [action.fieldName]: action.payload,
          }));
        }
        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          addOpen: true,
        };
      case ACTIONS.EDITOPEN:
        setRecord(action.payload);
        return {
          ...state,
          editOpen: true,
        };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        state = initialValues;
        setbenefitsData([
          {
            ClientID: 0,
            BStartDate: "",
            BTerm: 0,
            BPTerm: 0,
            BCoverage: "",
            BSumAssured: 0,
            Interest: 0,
          },
        ]);
        return {
          ...state,
          addOpen: false,
        };

      case ACTIONS.EDITCLOSE:
        return {
          ...state,
          editOpen: false,
        };
      case ACTIONS.INFOCLOSE:
        return {
          ...state,
          infoOpen: false,
        };
      case ACTIONS.CLIENTOPEN:
        return {
          ...state,
          clientOpen: true,
        };
      case ACTIONS.CLIENTCLOSE:
        return {
          ...state,
          clientOpen: false,
        };
      case ACTIONS.ADDRESSOPEN:
        return {
          ...state,
          addressOpen: true,
        };
      case ACTIONS.ADDRESSCLOSE:
        return {
          ...state,
          addressOpen: false,
        };
        case ACTIONS.BANKOPEN:
          return {
            ...state,
            bankOpen: true,
          };
        case ACTIONS.BANKCLOSE:
          return {
            ...state,
            bankOpen: false,
          };
      case ACTIONS.AGENCYOPEN:
        return {
          ...state,
          agencyOpen: true,
        };
      case ACTIONS.AGENCYCLOSE:
        return {
          ...state,
          agencyOpen: false,
        };
      case ACTIONS.BENEFITOPEN:
        setRecord(action.payload);
        return {
          ...state,
          benefitOpen: true,
        };
      case ACTIONS.BENEFITCLOSE:
        return {
          ...state,
          benefitOpen: false,
        };
      case ACTIONS.NOMINEEOPEN:
        console.log(action.payload, "EEEEEEE");
        setRecord(action.payload);
        return {
          ...state,
          nomineeOpen: true,
        };
      case ACTIONS.NOMINEECLOSE:
        return {
          ...state,
          nomineeOpen: false,
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

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);

  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);
  const [isConfirm, setisConfirm] = useState(false);
  const [policyId, setPolicyId] = useState(0);
  const [validateData, setvalidateData] = useState([]);
  const [summaryData, setsummaryData] = useState([]);
  const [isPolicyValidate, setisPolicyValidate] = useState(false);
  const [isIssue, setisIssue] = useState(false);
  const [issueNote, setissueNote] = useState(false);
  const [issueData, setissueData] = useState();
  const [nomineeByPolicyData, setNomineeByPolicyData] = useState();

  const policyvalidateOpen = () => {
    setisPolicyValidate(true);
  };

  const policyvalidateClose = () => {
    setisPolicyValidate(false);
    getData();
  };

  const confirmOpen = (id: number) => {
    setPolicyId(id);
    setisConfirm(true);
  };

  const confirmClose = () => {
    setisConfirm(false);
  };

  const issueOpen = (id: number) => {
    setPolicyId(id);
    setisIssue(true);
  };

  const issueClose = () => {
    setisIssue(false);
  };

  const issueNoteOpen = () => {
    setissueNote(true);
  };

  const issueNoteClose = () => {
    setissueNote(false);
    getData();
  };

  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        console.log(resp);
        setData(resp.data["All Policies"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Policies"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  //Add Api
  const handleFormSubmit = async () => {
    try {
      const response = await addApi(state, companyId);
      getData();
      return {
        response,
        status: response.status,
      };
    } catch (err: any) {
      console.log(err);
      return {
        response: err,
        status: err.response.status,
      };
    }
  };

  const validatePolicy = (policyId: number) => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/policyvalidate/${policyId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setvalidateData(resp.data["Payable Amount"]);
        setsummaryData(resp.data["Summary"]);
        setisConfirm(false);
        policyvalidateOpen();
      })
      .catch((err) => {
        console.log(err, "Error");
        setNotify({
          isOpen: true,
          message: err.response.data.ValidatePolicy,
          type: "error",
        });
        confirmClose();
      });
  };

  const issuePolicy = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/policyissue/${policyId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setissueData(resp.data.Policy);
        setisIssue(false);
        setissueNote(true);
        // console.log(resp.data,"Policy")
      });
  };

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        console.log(resp);
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        console.log(resp);
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  const nexPage = () => {
    setpageNum((prev) => prev + 1);
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pageNum > 1) {
      setpageNum((prev) => prev - 1);
    } else return;
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  const [benefitsByPoliciesData, setbenefitsByPoliciesData] = useState<any>([]);

  //const interest = useRef<any>();
  const [interest, setinterest] = useState(0.0);

  const getBenefitsByPolicies1 = (policyId: number) => {
    getBenefitsByPolicies(policyId)
      .then((resp) => {
        setbenefitsByPoliciesData(resp.data?.Benefit);
        setinterest(resp.data?.Interest);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getBenefitsByPolicies1(record.ID);
    return () => {};
  }, [state.benefitOpen, state.editOpen]);

  const getBenefit = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/benefitget/${benefitsByPoliciesData[0]?.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        //interest.current = res.data.Interest;
        setinterest(res.data.Interest);
        console.log(res.data.Interest, "Interest ");
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    console.log(benefitsByPoliciesData[0]?.ID, "benefit data");
    getBenefit();
    return () => {};
  }, [state.editOpen && record.PProduct === "MRT"]);

  return (
    <div>
      <CustomModal
        size={size}
        open={isPolicyValidate}
        handleClose={policyvalidateClose}
      >
        <PolicyValidate data={validateData} summaryData={summaryData} />
      </CustomModal>
      <header className={styles.flexStyle}>
        <span>
          <TextField
            select
            value={state.searchCriteria}
            placeholder="Search Criteria"
            label="Search Criteria"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.ONCHANGE,
                payload: e.target.value,
                fieldName: "searchCriteria",
              })
            }
            style={{ width: "12rem" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fieldMap.map((value: any) => (
              <MenuItem key={value.fieldName} value={value.fieldName}>
                {value.displayName}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={styles["text-fields"]}>
          <TextField
            value={state.searchString}
            placeholder="Search String"
            label="Search String"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.ONCHANGE,
                payload: e.target.value,
                fieldName: "searchString",
              })
            }
            style={{ width: "12rem" }}
          />
          <Button
            variant="contained"
            onClick={getData}
            color="primary"
            style={{
              marginTop: "0.5rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
              backgroundColor: "#0a3161",
              marginLeft: "10px",
            }}
          >
            <SearchIcon />
          </Button>
        </span>

        <h1>New Business Enquiry</h1>
        <Button
          id={styles["add-btn"]}
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
          onClick={() => dispatch({ type: ACTIONS.ADDOPEN })}
        >
          <AddBoxIcon />
        </Button>
      </header>
      <NewBussinessTable
        data={data}
        issueOpen={issueOpen}
        confirmOpen={confirmOpen}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        hardDelete={hardDelete}
        getData={getData}
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

      <PolicyEnquiry
        state={state}
        record={record}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        handleFormSubmit={editFormSubmit}
      />

      <PolicyModal
        getData={getData}
        state={state}
        record={record}
        dispatch={dispatch}
        setNotify={setNotify}
        validatePolicy={validatePolicy}
        ACTIONS={ACTIONS}
        benefitsData={state.addOpen ? benefitsData : benefitsByPoliciesData}
        interest={interest}
        setbenefitsData={
          state.addOpen ? setbenefitsData : setbenefitsByPoliciesData
        }
      />

      <CustomModal
        size={size}
        open={state.benefitOpen}
        handleClose={() => dispatch({ type: ACTIONS.BENEFITCLOSE })}
      >
        <Benefit
          benefitsByPoliciesData={benefitsByPoliciesData}
          getBenefitsByPolicies1={getBenefitsByPolicies1}
          getPolicies={getData}
          policyRecord={record}
          interest={interest}
          lookup={state.benefitOpen}
        />
      </CustomModal>

      <NotificationModal
        open={isConfirm}
        handleClose={confirmClose}
        handleFormSubmit={() => validatePolicy(policyId)}
      >
        <h4>Are you sure you want to validate policy?</h4>
      </NotificationModal>
      <NotificationModal
        open={isIssue}
        handleClose={issueClose}
        handleFormSubmit={issuePolicy}
      >
        <h4>Are you sure you want to issue policy?</h4>
      </NotificationModal>
      <NotificationModal open={issueNote} handleClose={issueNoteClose}>
        <h4>{issueData}</h4>
      </NotificationModal>

      <CustomModal
        size={size}
        open={state.nomineeOpen}
        handleClose={() => dispatch({ type: ACTIONS.NOMINEECLOSE })}
      >
        <Nominee lookup={state.nomineeOpen} policyRecord={record} />
      </CustomModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default NewBusiness;
