import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required 
import { MrtaStateType } from "../../../reducerUtilities/types/mrta/mrtaTypes";


export const getAllApi = (
pageNum: number,
pageSize: number,
state: MrtaStateType
)=> {
// Attention : Check and update the below API, if required
  return axios.get(
`http://localhost:3000/api/v1/nbservices/getallmrtaben`, {
    withCredentials: true,
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchString: state.searchString,
      searchCriteria: state.searchCriteria,
      sortColumn: state.sortColumn,
      sortDirection: state.sortAsc ? "asc" : state.sortDesc ? "desc" : null,
    },
  });
};
export const paramItem = (
  companyId: number,
  name: string,
  languageId: number
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name,
      languageId,
    },
  });
};

  export const addApi = (state: MrtaStateType, companyId: number) => { 
// Attention : Check and update the below API, if required
  return axios.post(
  `http://localhost:3000/api/v1/nbservices/mrtacreate`, 
    { 
      Benefitid      : parseInt(state.Benefitid      ),
      PolicyID: parseInt(state.PolicyID),
      Pproduct: state.Pproduct,
      Bcoverage      : state.Bcoverage      ,
      Clientid       : parseInt(state.Clientid       ),
      Bstartdate: moment(state.Bstartdate).format("YYYYMMDD"),
      Bterm           : state.Bterm           ,
      Prempayingterm : state.Prempayingterm ,
      Bsumassured: state.Bsumassured,
      Interest       : state.Interest       ,
      Interimperiod  : state.Interimperiod  ,
    },
    {
      withCredentials: true,
    }
  );
};

  export const editApi = (record: any) => { 
// Attention : Check and update the below API, if required
  return axios.put(
  `http://localhost:3000/api/v1/nbservices/mrtaupdate`, 
    { 
      Benefitid      : parseInt(record.Benefitid      ),
      PolicyID: parseInt(record.PolicyID),
      Pproduct: record.Pproduct,
      Bcoverage      : record.Bcoverage      ,
      Clientid       : parseInt(record.Clientid       ),
      Bstartdate: moment(record.Bstartdate).format("YYYYMMDD"),
      Bterm           : record.Bterm           ,
      Prempayingterm : record.Prempayingterm ,
      Bsumassured: record.Bsumassured,
      Interest       : record.Interest       ,
      Interimperiod  : record.Interimperiod  ,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
//Attention: Check the path below,if required 
    `http://localhost:3000/api/v1/nbservices/mrtadelete/${id}` ,
    {
      withCredentials: true,
    }
  );
};