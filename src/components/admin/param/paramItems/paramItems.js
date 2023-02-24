
import React, {Fragment, useEffect,useState} from 'react';
import useHttp from '../../hooks/use-http';
import { getData } from '../../services/http-service';
import CustomTooltip from '../../components/customTooltip';
import './paramItems.css'
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import ParamItem from '../paramItem/paramItem';

const ParamItems = () => {

  const {sendRequest : sendItemsGetRequest , status: itemsGetStatus ,  data: getItemsResponse , error:itemsGetError} = useHttp(getData, true);
  const [ pageAndSearch, setPageAndSearch] = useState({  pageNum : 1,
    pageSize : 10,
    searchString: "" ,
    searchCriteria: "item" ,
    sortColumn : 'item',
    sortDirection : 'asc',
    firstTime: true });

  const [ searchString, setSearchString] = useState('');

  const [ searchCriteria, setSearchCriteria] = useState('item');

  const [ modalData, setModalData] = useState({showModal: false , data : {}});

  const [searchparams] = useSearchParams();

  const navigate = useNavigate()

  useEffect(() => {
  
    let getDataParams = pageAndSearch;
    getDataParams.companyId = searchparams.get("companyId");
    getDataParams.name =  searchparams.get("name");
    getDataParams.languageId =  searchparams.get("languageId");
    sendItemsGetRequest({apiUrlPathSuffix : '/paramItems' , getDataParams :getDataParams});

}, [sendItemsGetRequest, pageAndSearch])


//pagination variables calculation
const pageActive =  pageAndSearch.pageNum ;
const pageNeighbourBefore = pageActive - 1;
const pageNeighbourAfter = pageActive + 1;
const totalRecords = (!itemsGetError &&  itemsGetStatus  === 'completed' )?getItemsResponse.paginationData.totalRecords: 0;
const startCount = ((pageAndSearch.pageNum - 1) * pageAndSearch.pageSize)  + 1;
const calcEndCount = ((pageAndSearch.pageNum - 1) * pageAndSearch.pageSize) +  pageAndSearch.pageSize ;

const endCount =  calcEndCount > totalRecords ? totalRecords :calcEndCount ;
const lastPage = Math.ceil(totalRecords/pageAndSearch.pageSize)
const disableNext = (pageActive === lastPage);
const disablePrev = (pageActive === 1 );
//end pagination variable calculation

//sorting css class settings
const sortingClass =  pageAndSearch.sortDirection === 'desc' ? "sorting_desc": "sorting_asc"; 
const columnFieldSortCssClasses = 
{

  item : pageAndSearch.sortColumn === 'item' ? sortingClass : 'sorting',

}

//sorting css class settings

const pageNumberChangeHandler = (pageNumber) =>
{
  setPageAndSearch((prevState) => ( {...prevState ,pageNum : (Number(pageNumber) )  } ))
}

const searchStringChangeHandler = (event) =>
{
  setSearchString(event.target.value);
}



const pageSizeChangeHandler = (event) =>
{
  const pageSize =  Number(event.target.value);
  
  setPageAndSearch((prevState) => ( {...prevState ,pageSize : pageSize   } ));
}


const searchCriteriaChangeHandler = (event) =>

{
    setSearchCriteria(event.target.value);

}

const searchHandler = () =>
{
 

  setPageAndSearch((prevState) => ( {...prevState , searchString , searchCriteria  } ))
  
}
const handleColumnSort = (fieldname) =>
{
  
  if(fieldname === pageAndSearch.sortColumn && pageAndSearch.sortDirection === 'asc')
  {
    setPageAndSearch((prevState) => ( {...prevState , sortDirection : 'desc'   } ));
  }
  else
  {
    setPageAndSearch((prevState) => ( {...prevState , sortColumn:fieldname , sortDirection : 'asc'   } ));
  }

}  
//handle incorrect page requests resulting in empty pages 
if(!itemsGetError &&  itemsGetStatus  === 'completed'  &&  pageAndSearch.pageNum > 1 && startCount > totalRecords )
{
    var newPageNum = pageAndSearch.pageNum - 1;
    while(true)
    {
      const newStartCount = (newPageNum - 1) * pageAndSearch.pageSize + 1;
      if(newStartCount <= totalRecords ||  newPageNum === 1 )
      {
        break;
      }

      newPageNum = newPageNum - 1;
    }

    setPageAndSearch((prevState) => ( {...prevState ,pageNum:  newPageNum } ))
}


const navigateToLink = (params) => {
     
      navigate ({
        pathname: params.link,
        search : createSearchParams(
         params.searchParams
        ).toString()
      })
     
  }

  const handleModal = (params) =>
  {
    setModalData({showModal :params.show, data : params.data});
    //if data was modified in modal, rfresh the data from server
   if(params.status === 'save')
   {
    let getDataParams = pageAndSearch;
    getDataParams.companyId = searchparams.get("companyId");
    getDataParams.name =  searchparams.get("name");
    getDataParams.languageId =  searchparams.get("languageId");
    sendItemsGetRequest({apiUrlPathSuffix : '/paramItems' , getDataParams :getDataParams});
   }
  }

    return (
      <Fragment>
        <div style = {{ minHeight : '500px'}}>

<div className= "row d-flex justify-content-between" style = {{margin : 'auto'}} > 
    
    <h2>
      Parameter Items
    </h2>

  <div  >
  <CustomTooltip
        text = "go back"
      >
    <button type="button" className="btn  btn-primary "  placement="bottom"  style = {{lineHeight : "1" , marginTop : ".5em" , marginRight : ".5em"}} onClick = { () => {
        navigateToLink({link : "/params"})
    }} > 
    <i className="fa fa-arrow-left"  ></i>
    </button> 
    </CustomTooltip>
  

  
  <CustomTooltip
        text = "Add Param"
      >
    <button type="button" className="btn  btn-primary "  placement="bottom"  style = {{lineHeight : "1" , marginTop : ".5em"}} 
    onClick= {() => { 
      let modalInputData = {mode : "create" , companyId : searchparams.get("companyId"), name :  searchparams.get("name"), languageId :  searchparams.get("languageId"), type: getItemsResponse.paramType};
   
      handleModal({show : true,  data : modalInputData }); 
    }}
    > 
    <i className="fa fa-plus-square"  ></i>
    </button> 
    </CustomTooltip>
  </div>
 
</div>



{ itemsGetStatus  === 'pending' &&  
(
  <div className="d-flex justify-content-center" style = {{marginTop: '10%' }} >
  <div className="spinner-border " style={{width: '3rem', height: '3rem' }}  role="status">
  <span className="sr-only">Loading...</span>
  </div>
  </div>
)

}

{(itemsGetError &&  itemsGetStatus  === 'completed' ) && <div className = "alert alert-danger" style = {{fontSize : '95%', padding : '0rem'}}>
                            <strong >Failed to get data!</strong> 
                            <span className = "pl-1" >
                            {itemsGetError}
                            </span>
                            
      </div> }

{ (itemsGetStatus  === 'completed' && !itemsGetError ) &&
<div className="dataTables_wrapper">

<div className = "row">
<div className = "col-sm-12 col-md-6">
<div className = "dataTables_length bs-select" style = {{display :"inline-flex"}}>
  <label style = {{ marginRight :'0.3rem' }}>
    Show
    </label>
    <select  className="custom-select custom-select-sm form-control form-control-sm"  value = {pageAndSearch.pageSize}  onChange={pageSizeChangeHandler}><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option>
    </select>
    <label style ={{ marginLeft :'0.3rem' }}>
    entries
    
  </label>
</div>
</div>

<div className = "col-sm-12 col-md-6" style = { { textAlign : 'right'}}>
<div className = "dataTables_filter"  style = {{display :"inline-flex"}} >
<label style = {{ marginRight :'0.3rem' }}>
 SearchBy:

</label>
<select  className="custom-select custom-select-sm form-control form-control-sm"  value = "name"  onChange={searchCriteriaChangeHandler} >
    
  {getItemsResponse.fieldMapping.map((data) => (
    <option value={data.fieldName} key={data.fieldName} >{data.displayName}</option>
  ))}

    
    </select>

<div className="input-group">
<input type="search" className="form-control form-control-sm"  value = {searchString}  onChange = {searchStringChangeHandler}   placeholder="" ></input>
<span className="input-group-append " style = {{height : 'calc(1.5em + 0.5rem + 2px)'}}>
<button type="button" className="btn btn-primary" onClick = {searchHandler} style = {{paddingTop : '0rem'}}>
    <i className="fa fa-search"></i>
  </button>
</span>
</div>

</div>

</div>

</div>
<div className = "row">
  <div className = "col-sm-12">

<table   className="table  table-bordered table-striped table-sm"  style = {{marginBottom: '0'}}  >
  <tbody>
    <tr>
      <td  scope="col" style={{width: '10%', border: '0'}}>
        <b>Company Id:</b>&nbsp;&nbsp;{searchparams.get("companyId")}
      </td>

      <td  scope="col" style={{width: '10%', border: '0'}}>
        <b>Language Id:</b>&nbsp;&nbsp;{searchparams.get("languageId")}
      </td>
    
      <td  scope="col" style={{width: '80%', border: '0'}} >
        <b>Param Name: </b>&nbsp;&nbsp;{searchparams.get("name")}
      </td> 

    </tr>
    </tbody>
    </table>



<table id="dtBasicExample" className="table table-striped table-bordered table-sm dataTable" cellSpacing="0" width="100%">
  <thead>
  
    <tr role = "row">
      
      <th className = {`th-sm ${columnFieldSortCssClasses.item?columnFieldSortCssClasses.item : ''}`}  onClick = {() => { handleColumnSort("item");}} >Item
      </th>
      <th className="th-sm">Short Description
      </th>
      <th className="th-sm">Long Description
      </th>
      <th className="th-sm">Actions
      </th>

    </tr>
    
  </thead>
  <tbody>

  {getItemsResponse.data.map((data) => (
        <tr key={data.item}  >

<td>{data.item}</td>
      <td>{data.shortdesc}</td>
      <td>{data.longdesc}</td>
      <td>
      <CustomTooltip
        text = "Edit"
      >
        <i className="fa fa-edit" style={{fontSize : '1.33333em', marginRight :'.5em'}} 
        
        onClick= {() => { 
            let modalInputData = {companyId : data.companyId , name: data.name , languageId : data.languageId, item : data.item ,type: getItemsResponse.paramType, mode : "update"};
         
            handleModal({show : true,  data : modalInputData }); }}
        
        ></i>
        
        </CustomTooltip> 

       {  getItemsResponse.paramType !== "0" && <CustomTooltip
        text = "View Data"
      >
        <i className="fa fa-eye" style={{fontSize : '1.33333em', marginRight :'.5em'}}
        onClick = { () => {
        
          navigateToLink({link : "/paramData", searchParams : { 
            companyId : data.companyId,
            name : data.name,
            languageId : data.languageId,
            item:data.item
          }})
      }}
        ></i>
        </CustomTooltip> 
}

<CustomTooltip
        text = "Delete"
      >
        <i className="fa fa-trash" style={{fontSize : '1.33333em', marginRight :'.5em'}}  onClick= {() => { 
          let modalInputData = {companyId : data.companyId , name: data.name , languageId : data.languageId ,item : data.item, type: getItemsResponse.paramType, mode : "delete"};
       
          handleModal({show : true,  data : modalInputData }); }}></i>
        </CustomTooltip>
        
        </td>
 
          </tr>
      ))}
    
  </tbody>

</table>
</div>
</div>
<div className = "row">
<div className="col-sm-12 col-md-5"><div className="dataTables_info" >Showing {startCount} to {endCount} of {totalRecords} entries</div></div>
<div className="col-sm-12 col-md-7"  ><div className="dataTables_paginate paging_simple_numbers" ><ul className="pagination"><li className={`paginate_button page-item previous ${disablePrev?'disabled':''} `}><a href="#"  onClick= {() => { pageNumberChangeHandler(pageActive - 1); }} className="page-link" aria-label="Previous"> <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span></a></li>
        {pageActive > 2 && 
        <li className="paginate_button page-item " >
          <a href="#" className="page-link"  onClick= {() => { pageNumberChangeHandler(1); }}  >1</a>
          </li>
         }
          {pageActive === 4 &&
          <li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(2); }} >2</a>
          </li>
}
{pageActive > 4 && 

<li className="paginate_button page-item disabled">
<a href="#"  className="page-link">...</a>
</li>

}

{pageActive > 1 && 
          <li className="paginate_button page-item ">
          <a href="#" className="page-link"  onClick= {() => { pageNumberChangeHandler(pageNeighbourBefore); }} >{pageNeighbourBefore}</a>
          </li>
}
          <li className="paginate_button page-item active">
          <a href="#"  className="page-link">{pageActive}</a>
          </li>
       {   pageActive !==  lastPage && 
          <li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(pageNeighbourAfter); }} >{pageNeighbourAfter}</a>
          </li>

       }

{(lastPage - pageNeighbourAfter)  > 2 && 
          <li className="paginate_button page-item disabled">
          <a href="#"  className="page-link">...</a>
          </li>
}
{(lastPage - pageNeighbourAfter)  === 2 && 

<li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(pageNeighbourAfter+1); }}>{pageNeighbourAfter+1}</a>
          </li>

}
          {    lastPage > pageNeighbourAfter  && 
          <li className="paginate_button page-item ">
          <a href="#"  className="page-link"  onClick= {() => { pageNumberChangeHandler(lastPage); }}>{lastPage}</a>
          </li>
          }
        
          <li className= {`paginate_button page-item next ${disableNext?'disabled':''} `} >
          <a href="#"  className="page-link" aria-label="Next" onClick= {() => { pageNumberChangeHandler(pageActive + 1); }}> <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span></a>
        </li>
        </ul>
        </div>
        </div>
</div>
</div> }
</div>


<ParamItem show = {modalData.showModal}   handleModal= {handleModal}   data = {modalData.data}  />  

</Fragment>
);

    }

    export default ParamItems;