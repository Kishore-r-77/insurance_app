import React , { forwardRef, useRef, useImperativeHandle } from 'react';
import './test.css'
const Test = forwardRef((props,ref) => {

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    let dataret = props.data;
      
      useImperativeHandle(ref, () => ({
 
       
        getData() {
       
            
             dataret.firstName = firstNameInputRef.current.value;
             dataret.lastName = lastNameInputRef.current.value;
            return dataret
          
        }
    
      }));

  
    
   

          return( <div className="row"> 
    
           <div className="form-group col-sm-6">
       
             <label  htmlFor="firstName" >First Name</label>
             
             <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {firstNameInputRef} defaultValue = {props.data.firstName} className="form-control form-control-sm rounded-1"   name="firstName"    id = "firstName"/>  
           </div>

           <div className="form-group col-sm-6">
       
       <label  htmlFor="lastName" >Last Name</label>
       
       <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {lastNameInputRef} defaultValue = {props.data.lastName} className="form-control form-control-sm rounded-1"   name="lastName"    id = "lastName"/>  
     </div>
           </div>)


}
);

export default Test;