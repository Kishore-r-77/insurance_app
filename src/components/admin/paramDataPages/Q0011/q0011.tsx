import React , { forwardRef, useRef, useImperativeHandle } from 'react';
import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import './q0011.css'
const Q0011 = forwardRef((props:any,ref) => {

    const mandatoryNameInputRef0:any = useRef();
    const coverageNameNameInputRef0:any = useRef();
    const mandatoryNameInputRef1:any = useRef();
    const coverageNameNameInputRef1:any = useRef();
    const mandatoryNameInputRef2:any = useRef();
    const coverageNameNameInputRef2:any = useRef();
    const mandatoryNameInputRef3:any = useRef();
    const coverageNameNameInputRef3:any = useRef();
    const mandatoryNameInputRef4:any = useRef();
    const coverageNameNameInputRef4:any = useRef();
    const mandatoryNameInputRef5:any = useRef();
    const coverageNameNameInputRef5:any = useRef();
    let inputdata:any = {}
    if(props.data)
    {
      inputdata= props.data;
    }
      
      useImperativeHandle(ref, () => ({
 
       
        getData() {
       
            
          inputdata.coverages[0].coverageName = coverageNameNameInputRef0.current.value;
          inputdata.coverages[0].mandatory = mandatoryNameInputRef0.current.value;
          
          inputdata.coverages[1].coverageName = coverageNameNameInputRef1.current.value;
          inputdata.coverages[1].mandatory = mandatoryNameInputRef1.current.value;
          
          inputdata.coverages[2].coverageName = coverageNameNameInputRef2.current.value;
          inputdata.coverages[2].mandatory = mandatoryNameInputRef2.current.value;
          
          inputdata.coverages[3].coverageName = coverageNameNameInputRef3.current.value;
          inputdata.coverages[3].mandatory = mandatoryNameInputRef3.current.value;
          
          inputdata.coverages[4].coverageName = coverageNameNameInputRef4.current.value;
          inputdata.coverages[4].mandatory = mandatoryNameInputRef4.current.value;
          
          inputdata.coverages[5].coverageName = coverageNameNameInputRef5.current.value;
          inputdata.coverages[5].mandatory = mandatoryNameInputRef5.current.value;
          

          return inputdata
          
        }
    
      }));

  
    
   

          return(
<>
            <Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="coverageName"
                  name="coverageName"
                  inputRef = {coverageNameNameInputRef0} 
                  placeholder="coverageName"
                  label="coverageName"
                  defaultValue = {inputdata.coverages[0].coverageName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Mandatory"
                  name="Mandatory"
                  inputRef = {mandatoryNameInputRef0} 
                  placeholder="Mandatory"
                  label="Mandatory"
                  defaultValue = {inputdata.coverages[0].mandatory}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="coverageName"
                  name="coverageName"
                  inputRef = {coverageNameNameInputRef1} 
                  placeholder="coverageName"
                  label="coverageName"
                  defaultValue = {inputdata.coverages[1].coverageName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Mandatory"
                  name="Mandatory"
                  inputRef = {mandatoryNameInputRef1} 
                  placeholder="Mandatory"
                  label="Mandatory"
                  defaultValue = {inputdata.coverages[1].mandatory}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="coverageName"
                  name="coverageName"
                  inputRef = {coverageNameNameInputRef2} 
                  placeholder="coverageName"
                  label="coverageName"
                  defaultValue = {inputdata.coverages[2].coverageName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Mandatory"
                  name="Mandatory"
                  inputRef = {mandatoryNameInputRef2} 
                  placeholder="Mandatory"
                  label="Mandatory"
                  defaultValue = {inputdata.coverages[2].mandatory}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="coverageName"
                  name="coverageName"
                  inputRef = {coverageNameNameInputRef3} 
                  placeholder="coverageName"
                  label="coverageName"
                  defaultValue = {inputdata.coverages[3].coverageName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Mandatory"
                  name="Mandatory"
                  inputRef = {mandatoryNameInputRef3} 
                  placeholder="Mandatory"
                  label="Mandatory"
                  defaultValue = {inputdata.coverages[3].mandatory}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="coverageName"
                  name="coverageName"
                  inputRef = {coverageNameNameInputRef4} 
                  placeholder="coverageName"
                  label="coverageName"
                  defaultValue = {inputdata.coverages[4].coverageName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Mandatory"
                  name="Mandatory"
                  inputRef = {mandatoryNameInputRef4} 
                  placeholder="Mandatory"
                  label="Mandatory"
                  defaultValue = {inputdata.coverages[4].mandatory}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                   inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="coverageName"
                  name="coverageName"
                  inputRef = {coverageNameNameInputRef5} 
                  placeholder="coverageName"
                  label="coverageName"
                  defaultValue = {inputdata.coverages[5].coverageName}
                  fullWidth
            

                 
                  margin="dense"
                />
  
</Grid2>

<Grid2  xs={8} md={4} lg={4}  sm= {4}>
<TextField
                  inputProps={{ readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Mandatory"
                  name="Mandatory"
                  inputRef = {mandatoryNameInputRef5} 
                  placeholder="Mandatory"
                  label="Mandatory"
                  defaultValue = {inputdata.coverages[5].mandatory}
                  fullWidth
                
 
                 
                  margin="dense"
                />
  
</Grid2>
</>      
           )


}
);

export default Q0011;