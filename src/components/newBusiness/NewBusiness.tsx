import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
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
import Nominee from "../nominee/nomineeTable/Nominee";
import NewBussinessTable from "./NewBussinessTable";
import styles from "./newBusiness.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./newBusinessApis/newBusinessApis";
import PolicyValidate from "./policyValidate/PolicyValidate";

import Notification from "../../utilities/Notification/Notification";
import { useBusinessDate } from "../contexts/BusinessDateContext";
import { getBenefitsByPolicies } from "../policy/policyApis/policyApis";
import PolicyEnquiry from "../policy/policyModal/PolicyEnquiry";
import Benefit from "../policy/policyModal/benefit/Benefit";
import NewBusinessModal from "./newBusinessModal/NewBusinessModal";
import PolicyInformation from "./newBusinessEnquiry/PolicyInformation";
import moment from "moment";

function NewBusiness({
  modalFunc,
  dataIndex,
  lookup,
  getByTable,
  getByFunction,
  receiptLookup,
  searchContent,
  handleSearchChange,
  receiptFieldMap,
}: any) {
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
  const { businessDate } = useBusinessDate();

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: PolicyStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));

        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          PRCD: businessDate,
          ProposalDate: businessDate,
          PReceivedDate: businessDate,
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

        return {
          ...state,
          PRCD: "",
          PReceivedDate: "",
          addOpen: false,
        };

      case ACTIONS.EDITCLOSE:
        return {
          ...state,
          editOpen: false,
        };
      case ACTIONS.INFOCLOSE:
        setRecord("");
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
        // setbenefitsData(
        //   state.PProduct === "ILP"
        //     ? initialBenefitsValuesIlp
        //     : initialBenefitsValues
        // );
        return {
          ...state,
          clientOpen: false,
        };
      case ACTIONS.AUTHOPEN:
        return {
          ...state,
          authOpen: true,
        };
      case ACTIONS.AUTHCLOSE:
        // setbenefitsData(
        //   state.PProduct === "ILP"
        //     ? initialBenefitsValuesIlp
        //     : initialBenefitsValues
        // );
        return {
          ...state,
          authOpen: false,
        };
      case ACTIONS.BENEFITCLIENTOPEN:
        return {
          ...state,
          benefitClientOpen: true,
        };
      case ACTIONS.BENEFITCLIENTCLOSE:
        return {
          ...state,
          benefitClientOpen: false,
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
  let [state, dispatch] = useReducer(reducer, initialValues);
  const initialBenefitsValues = [
    {
      ClientID: 0,
      BStartDate: "",
      BTerm: 0,
      BPTerm: 0,
      BCoverage: "",
      BSumAssured: 0,
      Interest: 0,
      BPrem: 0,
      Extras: [],
    },
  ];
  const initialBenefitsValuesIlp = [
    {
      ClientID: 0,
      BStartDate: "",
      BTerm: 0,
      BPTerm: 0,
      BCoverage: "",
      BSumAssured: 0,
      Interest: 0,
      BPrem: 0,
      IlpFunds: [],
      Extras: [],
    },
  ];

  const [benefitsData, setbenefitsData] = useState(
    state.PProduct === "ILP" ? initialBenefitsValuesIlp : initialBenefitsValues
  );

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
        setData(resp.data["All Policies"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Policies"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

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
        setNotify({
          isOpen: true,
          message: err?.response?.data?.ValidatePolicy,
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
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
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
  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    if (receiptLookup) {
      getByFunction(pageNum, pageSize, searchContent);
    } else {
      getData();
    }

    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  const [benefitsByPoliciesData, setbenefitsByPoliciesData] = useState<any>([]);

  //const interest = useRef<any>();
  const [interest, setinterest] = useState(0.0);
  const [funds, setfunds] = useState([]);
  const [extraDetails, setextraDetails] = useState<any>([]);

  const getBenefitsByPolicies1 = (policyId: number) => {
    getBenefitsByPolicies(policyId)
      .then((resp) => {
        setbenefitsByPoliciesData(resp.data?.Benefit);
        setinterest(resp.data?.Interest);
        setfunds(resp.data?.Funds);
        setextraDetails(resp?.data?.Extra);
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
        setfunds(res.data?.Funds);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getBenefit();
    return () => {};
  }, [state.editOpen && record.PProduct === "MRT"]);

  useEffect(() => {
    setbenefitsData(
      state.PProduct === "ILP"
        ? initialBenefitsValuesIlp
        : initialBenefitsValues
    );
    return () => {};
  }, [state.addOpen === false]);

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
            name="searchCriteria"
            value={
              receiptLookup
                ? searchContent.searchCriteria
                : state.searchCriteria
            }
            placeholder="Search Criteria"
            label="Search Criteria"
            onChange={
              receiptLookup
                ? (e) => handleSearchChange(e)
                : (e) =>
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
            {receiptLookup
              ? receiptFieldMap?.map((value: any) => (
                  <MenuItem key={value.fieldName} value={value.fieldName}>
                    {value.displayName}
                  </MenuItem>
                ))
              : fieldMap.map((value: any) => (
                  <MenuItem key={value.fieldName} value={value.fieldName}>
                    {value.displayName}
                  </MenuItem>
                ))}
          </TextField>
        </span>
        <span className={styles["text-fields"]}>
          <TextField
            value={
              receiptLookup ? searchContent.searchString : state.searchString
            }
            placeholder="Search String"
            label="Search String"
            name="searchString"
            onChange={
              receiptLookup
                ? (e) => handleSearchChange(e)
                : (e) =>
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
            onClick={
              receiptLookup
                ? () => getByFunction(pageNum, pageSize, searchContent)
                : getData
            }
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
        {receiptLookup ? null : (
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
        )}
      </header>
      <NewBussinessTable
        data={receiptLookup ? getByTable : data}
        receiptLookup={receiptLookup}
        dataIndex={dataIndex}
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

      {/* <PolicyEnquiry
        state={state}
        record={record}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        handleFormSubmit={editFormSubmit}
      /> */}

      <PolicyInformation
        state={state}
        record={record}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        handleFormSubmit={editFormSubmit}
      />

      <NewBusinessModal
        getData={getData}
        state={state}
        record={record}
        dispatch={dispatch}
        setNotify={setNotify}
        validatePolicy={validatePolicy}
        ACTIONS={ACTIONS}
        benefitsData={state.addOpen ? benefitsData : benefitsByPoliciesData}
        initialBenefitsValuesIlp={initialBenefitsValuesIlp}
        initialBenefitsValues={initialBenefitsValues}
        interest={interest}
        setinterest={setinterest}
        funds={funds}
        setfunds={setfunds}
        extrasforedit={extraDetails}
        setextrasforedit={setextraDetails}
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
