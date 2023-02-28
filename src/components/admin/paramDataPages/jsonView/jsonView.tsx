import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React , { forwardRef, useRef, useImperativeHandle } from 'react';
import  "./jsonView.css"
const JsonView = forwardRef((props:any,ref) => {

    const paramExtraDataInputRef:any = useRef();
    
   
      useImperativeHandle(ref, () => ({
 
       
        getData() {
       
            return JSON.parse(paramExtraDataInputRef.current.value) 
          
        }
    
      }));

  
          return(
            
<Grid2  xs={12} md={12} lg={12}  sm= {12}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="extradata"
                  name="extradata"
                  inputRef = {paramExtraDataInputRef} 
                  placeholder="Extra Data"
                  label="Extra Data"
                   defaultValue = {JSON.stringify(props.data)}
                  fullWidth
                  multiline
  rows={4}
  maxRows={8}
                 
                  margin="dense"
                />
  
</Grid2>
            
            /*<div className="row"> 
    
           <div className="form-group col-sm-12">
       
           <label  htmlFor="extradata" >Extra Data</label>
             
             <textarea  disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {paramExtraDataInputRef} defaultValue = {JSON.stringify(props.data)} className="form-control form-control-sm rounded-1"   name="extradata"    id = "extradata"/>  
           </div>

           </div>*/)


}
);

export default JsonView;