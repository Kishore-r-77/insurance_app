
import React , {useEffect,useRef} from 'react';
import {Modal} from 'react-bootstrap';
import CustomTooltip from '../../components/customTooltip';
import useHttp from '../../hooks/use-http';
import { getData, modData } from '../../services/http-service';
import './paramItem.css'

const ParamItem = (props) => {

  
  const {sendRequest : sendGetDataRequest , status: getDataResponseStatus ,  data: getDataResponse , error:getDataResponseError} = useHttp(getData, (props.data.mode === "update") || (props.data.mode === "delete"));
  const {sendRequest : sendModDataRequest , status: modDataResponseStatus ,  data: modDataResponse , error:modDataResponseError , resetStatus : resetModDataRequestStatus} = useHttp(modData, false);
   
  const companyInputRef = useRef(); 
  const paramnameInputRef = useRef();
  const longdescInputRef = useRef();
  const shortdescInputRef = useRef();
  const languageIdInputRef = useRef();
  //const paramitemStartdateInputRef = useRef();
  //const paramitemEnddateInputRef = useRef();
  const paramitemInputRef = useRef();


  useEffect(() => { 
    if(props.show)
    {
      if(modDataResponseError)
      {
        resetModDataRequestStatus();
      }
      
      if(props.data.mode === "update"|| props.data.mode === "delete")
      {
      sendGetDataRequest({apiUrlPathSuffix : '/paramItem' , getDataParams :{companyId : props.data.companyId, name : props.data.name, item : props.data.item, languageId: props.data.languageId}});
      }
    }
  },[props.show]);


  useEffect(() => { 
    if(modDataResponseStatus  === 'completed' && !modDataResponseError )
    {
      props.handleModal({show : false , status : "save"  , data : { mode : props.data.mode}})
    }
   
  },[modDataResponseStatus ,modDataResponseError]);

  
  const submitHandler =  (event) =>
  {
    
    if(props.data.mode === "create" || props.data.mode === "update")
    {

      let requestBody  = {companyId : Number(companyInputRef.current.value),  
        name : paramnameInputRef.current.value,
        item : paramitemInputRef.current.value, 
        languageId: Number(languageIdInputRef.current.value), 
        longdesc:longdescInputRef.current.value, 
        shortdesc:shortdescInputRef.current.value };
  
      if(props.data.type === "D" && props.data.mode === "create")
      {
        
        requestBody.startDate = "19000101"
        //paramitemStartdateInputRef.current.value;
        requestBody.endDate = "20990101"
        //paramitemEnddateInputRef.current.value;
  
        
      }

    
    sendModDataRequest({apiUrlPathSuffix : '/paramItem' , requestBody:requestBody, mode: props.data.mode});
  }


  if(props.data.mode === "delete" )
  {
    sendModDataRequest({apiUrlPathSuffix : '/paramItem' , getDataParams :{companyId : props.data.companyId, name : props.data.name,item : props.data.item, languageId: props.data.languageId }, mode: props.data.mode});
  }
  
   
  };


  return (
    <Modal show={props.show} onHide={ () => { props.handleModal({show : false, status : "cancel" , data : { mode: props.data.mode }}) }}>
        <Modal.Header closeButton>
          <Modal.Title>Param Item Maintenance</Modal.Title>
        </Modal.Header>

       { (((props.data.mode === "update" || props.data.mode === "delete") && getDataResponseStatus  === 'completed' && !getDataResponseError ) || (props.data.mode === "create")) && <>
        <Modal.Body>

        <form   >

        <div className="row"> 
    <div className="form-group col-sm-6">
        <label htmlFor="itemcoy" >Company</label>
        
        <input type="number"  id = "itemcoy"  ref = {companyInputRef}   defaultValue =  {props.data.companyId} disabled className="form-control form-control-sm rounded-1" />
        
        
    </div>
    <div className="form-group col-sm-6">
        <label  htmlFor="itemtabl" >Param Name</label>
        <input type="text"  ref = {paramnameInputRef}   defaultValue =  {props.data.name} disabled  className="form-control form-control-sm rounded-1" />
    </div>
    </div>
    
    <div className="row"> 
    
    <div className="form-group col-sm-6">

      <label  htmlFor="item" >Item Name</label>
      <input type="text"   ref = {paramitemInputRef} defaultValue = {(props.data.mode === "update" || props.data.mode === "delete")?getDataResponse.param.item:''}  disabled= {props.data.mode === "update" || props.data.mode === "delete" }  className="form-control form-control-sm rounded-1"   name="item"    id = "item"   />
      
    </div>

    <div className="form-group col-sm-6">

<label  htmlFor="languageid" >Language Id</label>
<input type="number"   ref = {languageIdInputRef} defaultValue = {props.data.languageId}  disabled className="form-control form-control-sm rounded-1"   name="languageid"    id = "languageid"   />

</div>

  </div> 
{ /*props.data.type === "D" &&
  <div className="row"> 
    
    <div className="form-group col-sm-6">

      <label  htmlFor="startdate" >Start Date</label>
      <input type="date"   ref = {paramitemStartdateInputRef}  className="form-control form-control-sm rounded-1"   name="startdate"    id = "startdate"   />
      
    </div>
    <div className="form-group col-sm-6">

<label  htmlFor="enddate" >End Date</label>
<input type="date"   ref = {paramitemEnddateInputRef} className="form-control form-control-sm rounded-1"   name="enddate"    id = "enddate"   />

</div>

  </div> */
}

    
   
    <div className="form-group">
      <label  htmlFor="longdesc" >Long Desc</label>
      <input type="text"   ref = {longdescInputRef} defaultValue = {(props.data.mode === "update" || props.data.mode === "delete")?getDataResponse.param.longdesc: ''}  disabled= {props.data.mode === "delete"}   className="form-control form-control-sm rounded-1"  />
      
  </div>

    
    <div className="form-group">

      <label  htmlFor="shortdesc" >Short Desc</label>
      <input type="text"   ref = {shortdescInputRef} defaultValue = {(props.data.mode === "update" || props.data.mode === "delete")?getDataResponse.param.shortdesc:''}  disabled= {props.data.mode === "delete" }  className="form-control form-control-sm rounded-1"   name="shortdesc"    id = "shortdesc"   />
      
    </div>

   

  
        </form>
        </Modal.Body>
        <Modal.Footer style = {{justifyContent: 'flex-start'}}>
          {props.data.mode !== "delete" &&
        <CustomTooltip
        text = "Update"
      >
        <button type="button" style = {{marginRight :'0.5em' , width:'3em', height :'2.4em' }}   className="btn btn-default btn-custom  "   disabled = {modDataResponseStatus  === 'pending'}  onClick={submitHandler} ><i className="fa fa-check-circle" style={{fontSize : '1.33333em', lineHeight : '0.75em', verticalAlign : '-0.0667em'}}></i></button> 
        </CustomTooltip> 
}

{props.data.mode === "delete" &&
        <CustomTooltip
        text = "Delete"
      >
        <button type="button" style = {{marginRight :'0.5em' , width:'3em', height :'2.4em' }}   className="btn btn-danger"   disabled = {modDataResponseStatus  === 'pending'}  onClick={submitHandler} ><i className="fa fa-trash" style={{fontSize : '1.33333em', lineHeight : '0.75em', verticalAlign : '-0.0667em'}}></i></button> 
        </CustomTooltip> 
}
        <CustomTooltip
        text = "Cancel"
      >
   <button type="button"  style = {{marginRight :'0.5em' , width:'3em', height :'2.4em' }}   className="btn btn-default btn-custom  "     onClick={ () => {props.handleModal({show : false, status : "cancel", data : { mode: props.data.mode }})}} ><i className="fa fa-times-circle" style={{fontSize : '1.33333em', lineHeight : '0.75em', verticalAlign : '-0.0667em'}}></i></button>
   </CustomTooltip>

   {(modDataResponseError &&  modDataResponseStatus  === 'completed' ) && <div className = "alert alert-danger" style = {{fontSize : '95%', padding : '0rem'}}>
                            <strong >Failed to update!</strong> 
                            <span className = "pl-1" >
                            {modDataResponseError}
                            </span>
                            
      </div> }
      {( modDataResponseStatus  === 'pending' ) &&
      <img  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />  
        }  
      </Modal.Footer>
        </>
}
{ (props.data.mode === "update" || props.data.mode === "delete") && getDataResponseStatus  === 'pending' &&

( <Modal.Body>
  <div className="d-flex justify-content-center" style = {{marginTop: '10%' }} >
  <div className="spinner-border " style={{width: '3rem', height: '3rem' }}  role="status">
  <span className="sr-only">Loading...</span>
  </div>
  </div>
  </Modal.Body> 
)

}

{((props.data.mode === "update"|| props.data.mode === "delete") && getDataResponseError &&  getDataResponseStatus  === 'completed' ) && <div className = "alert alert-danger" style = {{fontSize : '95%', padding : '0rem'}}>
                            <strong >Failed to get data!</strong> 
                            <span className = "pl-1" >
                            {getDataResponseError}
                            </span>
                            
      </div> }
      </Modal>
  );

    }

    export default ParamItem;