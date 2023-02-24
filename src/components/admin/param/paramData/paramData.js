import React , {useEffect, useRef, useState} from 'react';
import useHttp from '../../hooks/use-http';
import { getData,modData } from '../../services/http-service';
import CustomTooltip from '../../components/customTooltip';
import Test from '../paramDataPages/test/test';
import P0001 from '../paramDataPages/p0001/p0001';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import './paramData.css'
import JsonView from '../paramDataPages/jsonView/jsonView';
const ParamData = () => {
    const {sendRequest : sendGetDataRequest , status: getDataResponseStatus ,  data: getDataResponse , error:getDataResponseError} = useHttp(getData, true);
    const {sendRequest : sendModDataRequest , status: modDataResponseStatus ,  data: modDataResponse , error:modDataResponseError , resetStatus : resetModDataRequestStatus} = useHttp(modData, false);
    const [searchparams] = useSearchParams();

    const [ pagination, setPagination] = useState({pageNum : 1 , fetchData : true});

    const [mode , setMode]  = useState("display");

    const navigate = useNavigate();


    const paramitemStartdateInputRef = useRef();
    const paramitemEnddateInputRef = useRef();
    const extraDataRef = useRef();

    

    useEffect(() => { 

        if(pagination.fetchData)
        {      
        let getDataParams = {}
        getDataParams.companyId = searchparams.get("companyId");
        getDataParams.name =  searchparams.get("name");
        getDataParams.languageId =  searchparams.get("languageId");
        getDataParams.item = searchparams.get("item");
        getDataParams.seqno =  pagination.pageNum - 1;
        sendGetDataRequest({apiUrlPathSuffix : '/paramItem' , getDataParams :getDataParams});
        }
         
      },[pagination]);

      useEffect(() => { 
        if(modDataResponseStatus  === 'completed' && !modDataResponseError  && mode !== 'display' )
        {
          if(mode === 'delete')
          {
            setPagination((prevState) => ( {pageNum : (prevState.pageNum - 1), fetchData :true  } ));
            getDataResponse.paginationData.totalRecords--;

          }
          if(mode === 'create')
          {
            getDataResponse.paginationData.totalRecords++;
          }
          setMode("display");
        }
       
      },[modDataResponseStatus ,modDataResponseError]);
    


      const navigateToLink = (params) => {
 
        navigate ({
          pathname: params.link,
          search : createSearchParams(
           params.searchParams
          ).toString()
        })
       
    }

    const pageNumberChangeHandler = (pageNumber) =>
{
  setPagination({pageNum :Number(pageNumber),  fetchData: true});
  if(mode !== "display")
  {
    setMode("display");
  }
  resetModDataRequestStatus(); 

}

    //pagination variables calculation
const totalRecfromBackend = (!getDataResponseError &&  getDataResponseStatus  === 'completed' ) && getDataResponse && getDataResponse.paginationData ?getDataResponse.paginationData.totalRecords: 0;
const  totalRecords = (mode === "create")? (totalRecfromBackend + 1): totalRecfromBackend;
const pageNeighbourBefore = pagination.pageNum - 1;
const pageNeighbourAfter = pagination.pageNum + 1;
const disableNext = (pagination.pageNum === totalRecords);
const disablePrev = (pagination.pageNum === 1 );
//end pagination variable calculation



const handleSubmit = () => {

  if(mode === "create" || mode === "update")
    {

      let extradata = extraDataRef.current.getData();
      
      let requestBody  = {companyId : Number(searchparams.get("companyId")),  
        name : searchparams.get("name"),
        item : searchparams.get("item"), 
        data : extradata,
        seqno : pagination.pageNum -1, 
        languageId: Number(searchparams.get("languageId")), 
      };
  
      if(getDataResponse.param.type === "D")
      {
       
        requestBody.startDate = paramitemStartdateInputRef.current.value.substring(0,4)+paramitemStartdateInputRef.current.value.substring(5,7)+ paramitemStartdateInputRef.current.value.substring(8,10);
       
        requestBody.endDate = paramitemEnddateInputRef.current.value.substring(0,4)+paramitemEnddateInputRef.current.value.substring(5,7)+ paramitemEnddateInputRef.current.value.substring(8,10);
       
  
        
      }
      
      sendModDataRequest({apiUrlPathSuffix : '/paramItem' , requestBody:requestBody, mode: mode});

    }

    if(mode === "delete" )
    {
      sendModDataRequest({apiUrlPathSuffix : '/paramItem' , getDataParams : {companyId : Number(searchparams.get("companyId")), name : searchparams.get("name") ,item : searchparams.get("item"), languageId: Number(searchparams.get("languageId")), seqno : pagination.pageNum -1 }, mode:mode});

    }


    
}

const getExtraDataComponent = (paramName) => {

  switch (paramName) {
    case '1-Test':
      return <Test ref={extraDataRef}  data={getDataResponse.param.data}  mode = {mode}/>
    case '1-P0001':
      return <P0001 ref={extraDataRef}  data={getDataResponse.param.data}  mode = {mode}/>
    default:
      return <JsonView ref={extraDataRef}  data={getDataResponse.param.data}  mode = {mode}/>
  }

}

      return (
        <div style = {{ minHeight : '500px'}}>

<div className= "row d-flex justify-content-between" style = {{margin : 'auto'}} > 
    
    <h2>
      Param Item Data
    </h2>

    <div  >
    { (mode === 'display' && getDataResponseStatus === "completed" && !getDataResponseError ) &&
    <CustomTooltip
        text = "Edit"
      >
    <button type="button" className="btn  btn-primary "  placement="bottom"  style = {{lineHeight : "1" , marginTop : ".5em" , marginRight : ".5em"}} 
    onClick = { () => {
      resetModDataRequestStatus();
      setMode("update");
  }}
    > 
    <i className="fa fa-edit"  ></i>
    </button> 
    </CustomTooltip>
}
    { (pagination.pageNum === totalRecords && mode == 'display' && getDataResponseStatus === "completed" && !getDataResponseError) && <>
    <CustomTooltip
        text = "Add"
      >
    <button type="button" className="btn  btn-primary "  placement="bottom"  style = {{lineHeight : "1" , marginTop : ".5em" , marginRight : ".5em"}}  
    
    onClick = { () => {
      resetModDataRequestStatus();
      setMode("create");
      setPagination((prevState) => ( {pageNum : (prevState.pageNum + 1), fetchData :false  } ));
      
  }}
    > 
    <i className="fa fa-plus-square"  ></i>
    </button> 
    </CustomTooltip>
    {  (pagination.pageNum > 1) &&
    <CustomTooltip
        text = "Delete"
      >
    <button type="button" className="btn btn-danger "  placement="bottom"  style = {{lineHeight : "1" , marginTop : ".5em" , marginRight : ".5em"}} 
    
    onClick = { () => {
      resetModDataRequestStatus();
      setMode("delete");
  }}
    > 
    <i className="fa fa-trash"  ></i>
    </button> 
    </CustomTooltip>
   }
    
    </>
    }

  <CustomTooltip
        text = "go back"
      >
    <button type="button" className="btn  btn-primary "  placement="bottom"  style = {{lineHeight : "1" , marginTop : ".5em" }} onClick = { () => {
        navigateToLink({link : "/paramItems", searchParams:  {
            companyId : searchparams.get("companyId"),
            name : searchparams.get("name"),
            languageId : searchparams.get("languageId")
          }})
    }} > 
    <i className="fa fa-arrow-left"  ></i>
    </button> 
    </CustomTooltip>
    </div>
  
 
</div>

<table   className="table  table-bordered table-striped table-sm"  style = {{marginBottom: '0.5em'}}  >
  <tbody>
    <tr >
      <td  scope="col" style={{width: '10%', border: '0'}}>
        <b>Company Id:</b>&nbsp;&nbsp;{searchparams.get("companyId")}
      </td>

      <td  scope="col" style={{width: '10%', border: '0'}}>
        <b>Language Id:</b>&nbsp;&nbsp;{searchparams.get("languageId")}
      </td>
    
      <td  scope="col" style={{width: '20%', border: '0'}} >
        <b>Param Name: </b>&nbsp;&nbsp;{searchparams.get("name")}
      </td> 
      <td  scope="col" style={{width: '20%', border: '0'}} >
        <b>Item Name: </b>&nbsp;&nbsp;{searchparams.get("item")}
      </td> 

      <td  scope="col" style={{width: '40%', border: '0'}} >
        <b>Item Description: </b>&nbsp;&nbsp;{getDataResponse?getDataResponse.param.longdesc:''}
      </td> 

    </tr>
    </tbody>
    </table>
   
    {(!getDataResponseError &&  getDataResponseStatus  === 'completed' && mode !== "pendingcancel") && <div >
            
         
            { getDataResponse.param.type === "D" && <div className="dataTables_wrapper"><div className="row"> 
    
             <div className="form-group col-sm-6">
         
               <label  htmlFor="startdate" >Start Date</label>
               <input type="date"   disabled = {mode === 'display' || mode === 'delete'} ref = {paramitemStartdateInputRef}  defaultValue = {getDataResponse.param.startDate.substring(0,4)+"-"+ getDataResponse.param.startDate.substring(4,6)+"-"+ getDataResponse.param.startDate.substring(6,8)} className="form-control form-control-sm rounded-1"   name="startdate"    id = "startdate"   />
               
             </div>
             <div className="form-group col-sm-6">
         
         <label  htmlFor="enddate" >End Date</label>
         <input type="date"  disabled = {mode === 'display' || mode === 'delete'}  ref = {paramitemEnddateInputRef} defaultValue = {getDataResponse.param.endDate.substring(0,4)+"-"+ getDataResponse.param.endDate.substring(4,6)+"-"+ getDataResponse.param.endDate.substring(6,8)}  className="form-control form-control-sm rounded-1"   name="enddate"    id = "enddate"   />
         
         </div>
         
           </div>
           </div> }

        {         getExtraDataComponent(searchparams.get("companyId") +"-" +searchparams.get("name"))   }


  <div className="row" style = {{ paddingLeft: '15px'}}>
    { (mode === 'update'|| mode === 'create' || mode === 'delete' ) && <>
    { (mode === 'update' || mode === 'create')?  <CustomTooltip
        text = {mode === "update"?"Update":"Create"}
      >
    <button type="button" className="btn  btn-primary "  disabled = {modDataResponseStatus === 'pending'} placement="bottom"  style = {{lineHeight : "1" , marginBottom : "0.3rem" , marginRight : ".5em"}} 
     onClick = { () => {
      handleSubmit();
  }}
    > 
    <i className="fa fa-check-circle"  ></i>
    </button> 
    </CustomTooltip>
    :

    <CustomTooltip
    text =  "Confirm Delete"
  >
<button type="button" className="btn  btn-danger "  disabled = {modDataResponseStatus === 'pending'} placement="bottom"  style = {{lineHeight : "1" , marginBottom : "0.3rem" , marginRight : ".5em"}} 
 onClick = { () => {
  handleSubmit();
}}
> 
<i className="fa fa-trash"  ></i>
</button> 
</CustomTooltip>
  
  
  
  
  }
   

<CustomTooltip
text = "Cancel"
>
<button type="button" className="btn  btn-primary "  disabled = {modDataResponseStatus === 'pending'} placement="bottom"  style = {{lineHeight : "1" ,  marginBottom : "0.3rem" }} 
  onClick = { () => {
    if(modDataResponseError)
    {
      resetModDataRequestStatus();
    }
    if(mode === 'create')
    {
      setPagination((prevState) => ( {pageNum : (prevState.pageNum - 1), fetchData :true  } ));
    }
   
    setMode ("pendingcancel");
    //this delay in rendering the form will help to restore the old values set as defaultValue in input elements
    setTimeout(() => {  setMode("display"); }, 0.1);
    
}}
> 
<i className="fa fa-times-circle"  ></i>
</button> 
</CustomTooltip>
<div  >
    { modDataResponseStatus === 'pending' &&  <img  className="pl-3"  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
  
 </div>

 { (modDataResponseError &&  modDataResponseStatus  === 'completed') &&  
 
 <div className="pl-2 alert-custom alert-danger" >
      
 <span >update failed : {modDataResponseError}</span>
 
</div>
 
}

</>
}

</div>
           { getDataResponse.param.type === "D" && <div className="dataTables_wrapper">
           <div className = "row">
<div className="col-sm-12 col-md-5"><div className="dataTables_info" >Showing {pagination.pageNum} of {totalRecords} entries</div></div>
<div className="col-sm-12 col-md-7"  ><div className="dataTables_paginate paging_simple_numbers" ><ul className="pagination"><li className={`paginate_button page-item previous ${disablePrev?'disabled':''} `}><a href="#"  onClick= {() => { pageNumberChangeHandler(pagination.pageNum - 1); }} className="page-link" aria-label="Previous"> <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span></a></li>
        {pagination.pageNum > 2 && 
        <li className="paginate_button page-item " >
          <a href="#" className="page-link"  onClick= {() => { pageNumberChangeHandler(1); }}  >1</a>
          </li>
         }
          {pagination.pageNum === 4 &&
          <li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(2); }} >2</a>
          </li>
}
{pagination.pageNum > 4 && 

<li className="paginate_button page-item disabled">
<a href="#"  className="page-link">...</a>
</li>

}

{pagination.pageNum > 1 && 
          <li className="paginate_button page-item ">
          <a href="#" className="page-link"  onClick= {() => { pageNumberChangeHandler(pageNeighbourBefore); }} >{pageNeighbourBefore}</a>
          </li>
}
          <li className="paginate_button page-item active">
          <a href="#"  className="page-link">{pagination.pageNum}</a>
          </li>
       {   pagination.pageNum !==  totalRecords && 
          <li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(pageNeighbourAfter); }} >{pageNeighbourAfter}</a>
          </li>

       }

{(totalRecords - pageNeighbourAfter)  > 2 && 
          <li className="paginate_button page-item disabled">
          <a href="#"  className="page-link">...</a>
          </li>
}
{(totalRecords - pageNeighbourAfter)  === 2 && 

<li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(pageNeighbourAfter+1); }}>{pageNeighbourAfter+1}</a>
          </li>

}
          {    totalRecords > pageNeighbourAfter  && 
          <li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(totalRecords); }}>{totalRecords}</a>
          </li>
          }
        
          <li className= {`paginate_button page-item next ${disableNext?'disabled':''} `} >
          <a href="#"  className="page-link" aria-label="Next" onClick= {() => { pageNumberChangeHandler(pagination.pageNum + 1); }}> <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span></a>
        </li>
        </ul>
        </div>
        </div>
</div>

           
           
            </div> }


</div> }

{ (getDataResponseError &&  getDataResponseStatus  === 'completed') &&  
 
 <div className="alert-custom alert-danger" >
      
 <span >{getDataResponseError}</span>
 
</div>
 
 }

{ (!modDataResponseError &&  modDataResponseStatus  === 'completed') &&  
 
 <div className="alert-custom alert-success col-sm-6" >
      
 <span >success! {modDataResponse.message} </span>
 
</div>
 
 }


{  getDataResponseStatus  === 'pending' &&

(
  <div className="d-flex justify-content-center" style = {{marginTop: '10%' }} >
  <div className="spinner-border " style={{width: '3rem', height: '3rem' }}  role="status">
  <span className="sr-only">Loading...</span>
  </div>
  </div>

)

}
 
        </div>
      )


}

export default ParamData;