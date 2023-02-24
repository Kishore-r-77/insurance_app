import React , { forwardRef, useRef, useImperativeHandle } from 'react';
import  "./jsonView.css"
const JsonView = forwardRef((props,ref) => {

    const paramExtraDataInputRef = useRef();
    
   
      useImperativeHandle(ref, () => ({
 
       
        getData() {
       
            return JSON.parse(paramExtraDataInputRef.current.value) 
          
        }
    
      }));

  
          return( <div className="row"> 
    
           <div className="form-group col-sm-12">
       
           <label  htmlFor="extradata" >Extra Data</label>
             
             <textarea  disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {paramExtraDataInputRef} defaultValue = {JSON.stringify(props.data)} className="form-control form-control-sm rounded-1"  rows = "5" name="extradata"    id = "extradata"/>  
           </div>

           </div>)


}
);

export default JsonView;