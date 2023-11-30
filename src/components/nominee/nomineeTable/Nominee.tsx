import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { NomineeStateType } from "../../../reducerUtilities/types/nominee/nomineeType";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/nominee/nomineeAction";

import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
  getNopmieesByPolicy,
} from "../nomineeApi/nomineeApi";
import NomineeModal from "../nomineeModel/NomineeModal";
import NomineeTable from "./NomineeTable";
import styles from "./nominee.module.css";

function Nominee({ modalFunc, lookup, sortParam, policyRecord }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  const [nomineesData, setNomineesData] = useState([
    {
      PolicyID: 0,
      ClientID: 0,
      NomineeRelationship: "",
      NomineeLongName: "",
      NomineePercentage: 0,
    },
  ]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: NomineeStateType, action: any) => {
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
        setNomineesData([
          {
            PolicyID: 0,
            ClientID: 0,
            NomineeRelationship: "",
            NomineeLongName: "",
            NomineePercentage: 0,
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

      // *** Attention: Check the Lookup Open /close ***
      case ACTIONS.POLICYOPEN:
        return {
          ...state,
          policyOpen: true,
        };
      case ACTIONS.POLICYCLOSE:
        return {
          ...state,
          policyOpen: false,
        };

      // *** Attention: Check the Lookup Open /close ***
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
      case ACTIONS.NOMINEECLIENTOPEN:
        return {
          ...state,
          nomineeClientOpen: true,
        };
      case ACTIONS.NOMINEECLIENTCLOSE:
        return {
          ...state,
          nomineeClientOpen: false,
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
  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["GetAllNominee"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["GetAllNominee"]);
        // setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const policyId = policyRecord.ID;

  const [nomineesByPolicyData, setnomineesByPolicyData] = useState([]);
  const getNomineesByPolicy1 = (policyId: number) => {
    getNopmieesByPolicy(policyId)
      .then((resp) => {
        setnomineesByPolicyData(resp.data?.Nominees);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getNomineesByPolicy1(policyRecord.ID);
    return () => {};
  }, [state.nomineeOpen]);

  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId, policyId, nomineesData)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created:${resp.data?.Created}`,
          type: "success",
        });
        getNomineesByPolicy1(policyRecord.ID);
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
        setNotify({
          isOpen: true,
          message: `Updated Successfully`,
          type: "success",
        });
        getNomineesByPolicy1(policyRecord.ID);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `Deleted Successfully`,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
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

  return (
    <div>
      <header className={styles.flexStyle}>
        <h1 style={lookup ? { textAlign: "center" } : {}}>Nominees</h1>
        {!lookup ? null : (
          <>
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
          </>
        )}
      </header>
      <NomineeTable
        data={lookup ? nomineesByPolicyData : data}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        hardDelete={hardDelete}
        sortParam={sortParam}
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
      <NomineeModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
        policyRecord={policyRecord}
        nomineesData={nomineesData}
        setNomineesData={setNomineesData}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default Nominee;
