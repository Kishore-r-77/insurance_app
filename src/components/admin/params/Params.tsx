import AddBoxIcon from "@mui/icons-material/AddBox";

import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getData } from "../../../services/http-service";
import { useNavigate, createSearchParams } from 'react-router-dom';
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/admin/paramsActions";
import { ParamsStateType } from "../../../reducerUtilities/types/admin/paramsTypes";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import styles from "./params.module.css";
import ParamModal from "./ParamModal";


function Params() {
  //data from getall api

  const {sendRequest : sendScreenGetRequest , status: screenGetStatus ,  data: getScreenResponse , error:screenGetError} = useHttp(getData, true);

  const [ pageAndSearch, setPageAndSearch] = useState({  pageNum : 1,
    pageSize : 5,
    searchString: "" ,
    searchCriteria: "name" ,
    sortColumn : 'name',
    sortDirection : 'asc',
    firstTime: true });

  useEffect(() => {
  
  
    sendScreenGetRequest({apiUrlPathSuffix : '/basicservices/params' , getDataParams :pageAndSearch});
 
 }, [sendScreenGetRequest, pageAndSearch])


 
 const totalRecords = (!screenGetError &&  screenGetStatus  === 'completed' )?getScreenResponse.paginationData.totalRecords: 0;
 const lastPage = Math.ceil(totalRecords/pageAndSearch.pageSize);
 const isLast = (lastPage === pageAndSearch.pageNum);   

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
 
  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: ParamsStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        console.log(action.fieldName, "fieldName");
        console.log(action.payload, "payload");
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

        case ACTIONS.DELOPEN:
            setRecord(action.payload);
            return {
              ...state,
              deleteOpen: true,
            };

      case ACTIONS.ADDCLOSE:
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
        case ACTIONS.DELCLOSE:
            return {
              ...state,
              deleteOpen: false,
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
  const [state, dispatch] = useReducer(reducer, {...initialValues, sortColumn: "name",
  sortAsc: true,
  sortDesc: false,});

  useEffect(() => {

    setPageAndSearch((prevState) => ( {...prevState ,sortColumn: state.sortColumn, sortDirection: state.sortAsc ? "asc" : state.sortDesc ? "desc" : "asc"   } ));
  }, [state.sortAsc, state.sortDesc]);



  const pageSizeChangeHandler =  (value:number) => {

    setPageAndSearch((prevState) => ( {...prevState ,pageSize : value   } ));
  } 

  const nexPage = () => {
  
    if(pageAndSearch.pageNum < lastPage )
    {
    setPageAndSearch((prevState) => ( {...prevState ,pageNum : prevState.pageNum + 1   } ));
    }
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pageAndSearch.pageNum > 1) {
        setPageAndSearch((prevState) => ( {...prevState ,pageNum : prevState.pageNum - 1   } ));
    } else return;
  };



const data = (!screenGetError &&  screenGetStatus  === 'completed' )?getScreenResponse.data.map((ob:any) => ({ ...ob , ID: ob.companyId +","+ ob.name+","+ob.languageId} )):[];



const navigate = useNavigate()

const navigateToLink = (params:any) => {
    if (params.link === '/paramItems')
     {
      navigate ({
        pathname: params.link,
        search : createSearchParams(
          {
            companyId : params.companyId,
            name : params.name,
            languageId : params.languageId
          }
        ).toString()
      })
     }
  }

  if(state.infoOpen && record.companyId ) {
   
  
    dispatch({ type: ACTIONS.INFOCLOSE })
   
    const row = { companyId: record.companyId, name: record.name, languageId : record.languageId } 
  
     navigateToLink({ ...row, link : "/paramItems"  });

    
    }
    const modalFunc = () =>
    {

    }

    
const hardDelete = (id:any) => {

   const colarray = id.split(",");
   const row = { companyId: colarray[0], name: colarray[1], languageId : colarray[2] } 
   dispatch({ type: ACTIONS.DELOPEN, payload: row })
}
const handleModal = (params:any) =>
{
  if(params.data.mode === "create")
  {
    dispatch({ type: ACTIONS.ADDCLOSE })
  }

  if(params.data.mode === "update")
  {
    dispatch({ type: ACTIONS.EDITCLOSE })
  }

  if(params.data.mode === "delete")
  {
    dispatch({ type: ACTIONS.DELCLOSE })
  }

  

  //if data was modified in modal, rfresh the data from server
 if(params.status === 'save')
 {
  sendScreenGetRequest({apiUrlPathSuffix : '/basicservices/params' , getDataParams :pageAndSearch});
 }
}


  return (
    <div>
      <header className={styles.flexStyle}>
        <span>
          <TextField
            select
            value={pageAndSearch.searchCriteria}
            placeholder="Search Criteria"
            label="Search Criteria"
            onChange={(e) =>
     
              setPageAndSearch((prevState) => ( {...prevState ,searchCriteria : e.target.value   } ))
            }
            style={{ width: "12rem" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {(screenGetStatus  === 'completed' && !screenGetError ) && getScreenResponse.fieldMapping.map((value: any) => (
              <MenuItem key={value.fieldName} value={value.fieldName}>
                {value.displayName}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={styles["text-fields"]}>
          <TextField
            value={pageAndSearch.searchString}
            placeholder="Search String"
            label="Search String"
            onChange={(e) =>
       
              setPageAndSearch((prevState) => ( {...prevState ,searchString : e.target.value   } ))
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

        <h1>Params</h1>
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
      {
       (screenGetStatus  === 'completed' && !screenGetError ) && 
        <>
      <CustomTable
        data={data}
       
        columns={columns}
        ACTIONS={ACTIONS}
        sortParam = { {fieldName: pageAndSearch.sortColumn,
            order: pageAndSearch.sortDirection}}
        dispatch={dispatch}
        modalFunc = {modalFunc}
        hardDelete = {hardDelete}
      />
      <CustomPagination
        pageNum={pageAndSearch.pageNum}
        setpageSize={pageSizeChangeHandler}
        // totalPages={totalPages}
        totalRecords={totalRecords}
        pageSize = { pageAndSearch.pageSize}
        isLast={isLast}
        prevPage={prevPage}
        nexPage={nexPage}
      />

<ParamModal show = {state.addOpen || state.editOpen||state.deleteOpen}   handleModal= {handleModal}   data = {{...record, mode : state.addOpen?"create": state.editOpen? "update": state.deleteOpen?"delete": "display"} }  />  
      </>
}

{ screenGetStatus  === 'pending' &&  
(
  <div className="d-flex justify-content-center" style = {{marginTop: '10%' }} >
  <div className="spinner-border " style={{width: '3rem', height: '3rem' }}  role="status">
  <span className="sr-only">Loading...</span>
  </div>
  </div>
)

}


{(screenGetError &&  screenGetStatus  === 'completed' ) && <div className = "alert alert-danger" style = {{fontSize : '95%', padding : '0rem'}}>
                            <strong >Failed to get data!</strong> 
                            <span className = "pl-1" >
                            {screenGetError}
                            </span>
                            
      </div> }
  
    </div>
  );
}

export default Params;
