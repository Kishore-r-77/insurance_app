import React , { forwardRef, useImperativeHandle,  useState } from 'react';
import { MenuItem, TextField} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import './p0050.css'
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
const P0050 = forwardRef((props:any,ref) => {

  const [inputdata, setInputdata] = useState(props.data?props.data:{})  


  useImperativeHandle(ref, () => ({
 
       
        getData() {
         
          let retData =  inputdata;
          retData.dataPairs = retData.dataPairs.filter((value:any)  => (
            value.code !== "")
           )

           setInputdata ((inputdata:any) => (
            {...inputdata, dataPairs:inputdata.dataPairs.filter((value:any)  => (
              value.code !== "")) }
            
             
           ))

           return retData;
   
        }
    
      }));

  
   const  deleteItemHandler = (index:Number) =>

    {

      setInputdata ((inputdata:any) => (

        {...inputdata , dataPairs: inputdata.dataPairs.filter((_:any,ind:number)=> ( ind !== index)) }
       
      ))  
    
      
    }

    const fieldChangeHandler = (index:number , fieldname:string, value:any ) =>
    {
    
      setInputdata ((inputdata:any) => (
     
        {...inputdata, dataPairs:   
          inputdata.dataPairs.map((val:any, ind:number) => {

            if(index === ind)
            {
               val[fieldname] = value;
               return val             }

            else
            {
             return val
            }

       }
          )
        
        } 
      ))

    }
    


          return(
            <Table striped bordered hover>
        <thead style = {{ backgroundColor: 'rgba(71, 11, 75, 1)',
  color : 'white',
  position: 'sticky',
  top: '0'}}>
          <tr>
           
                <th >
                  Code
                </th>

                <th >
                  Description
               </th>

                {(props.mode === 'update' || props.mode === 'create') && inputdata.dataPairs?.length > 0 &&
                  
                <th>
                  Actions
                </th>
                }
                 {(props.mode === 'update' || props.mode === 'create') && (!inputdata.dataPairs ||inputdata.dataPairs?.length === 0) &&
                  
                  <th>
                    <CustomTooltip
                    text = "Add"
                    >
                    <AddBoxIcon
                    onClick = { () => {

          
                      setInputdata ((inputdata:any) => (
                         {...inputdata , dataPairs: [{code:"", description:""}, ]}
                        
                      )
                      )
                     
                  }}
                    />
                    </CustomTooltip>
                  </th>
                  }
              
                
          </tr>
        </thead>
        <tbody>
        {inputdata.dataPairs?.map((value: any, index:number) => (
         
           
        
            <tr key = {index}>
             
                <td>
               
                <TextField
                  inputProps={{  readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Code"
                  name="Code"
                  value = {value.code}
                  onChange={(e) => (
                    fieldChangeHandler(index , "code", e.target.value )
                  )
                  }
                  fullWidth
                  size="small"
                  type= "text"
                 
                  margin="dense"
                />
                 
                </td>
                <td>
               
                <TextField
                  inputProps={{  readOnly:  (props.mode === 'display' || props.mode === 'delete')  }}
                  id="Description"
                  name="Description"
                  value = {value.description}
                  onChange={(e) => (
                    fieldChangeHandler(index , "description", e.target.value )
                  )
                  }
                  fullWidth
                  size="small"
                  type= "text"
                 
                  margin="dense"
                />
                  
                </td>
              
           
              
    {(props.mode === 'update' || props.mode === 'create') &&
  <td>

  <span style = {{  display: 'flex',
  gap: '0.5rem', marginTop : '0.9rem'}}>
                    <CustomTooltip
                    text = "Remove"
                    >
                    <DeleteIcon
                      color="error"
                      onClick={() =>
                      { deleteItemHandler(index);}
                      }
                    />
                    </CustomTooltip>
                    {index === (inputdata.dataPairs.length - 1) &&
                    <CustomTooltip
                    text = "Add"
                    >
                    <AddBoxIcon
                    onClick = { () => {

          
                      setInputdata ((inputdata:any) => (
                         {...inputdata , dataPairs: [...inputdata.dataPairs, {code:"", description:"" } ]}
                        
                      )
                      )
                     
                  }}
                    />
                    </CustomTooltip>
}
                  </span>
  </td>
}
            </tr>
         )
        
)}
        </tbody>
      </Table>
  
           )


}
);

export default P0050;