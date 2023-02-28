import React , { forwardRef, useRef, useImperativeHandle } from 'react';
import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import './test.css'
const Test = forwardRef((props:any,ref) => {

    const firstNameInputRef:any = useRef();
    const lastNameInputRef:any = useRef();
    let inputdata:any = {}
    if(props.data)
    {
      inputdata= props.data;
    }
      
      useImperativeHandle(ref, () => ({
 
       
        getData() {
       
            
          inputdata.firstName = firstNameInputRef.current.value;
          inputdata.lastName = lastNameInputRef.current.value;
          return inputdata
          
        }
    
      }));

  
    
   

          return(
<>
            <Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="firstname"
                  name="firstname"
                  inputRef = {firstNameInputRef} 
                  placeholder="First Name"
                  label="First Name"
                  defaultValue = {inputdata.firstName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="lastname"
                  name="lastname"
                  inputRef = {lastNameInputRef} 
                  placeholder="Last Name"
                  label="Last Name"
                  defaultValue = {inputdata.lastName}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
</>      
           )


}
);

export default Test;