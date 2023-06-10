import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import  "./p0041.css";


const P0041 = forwardRef((props: any, ref) => {

  const {sendRequest : sendMedrRequest , status: getMedrResponseStatus ,  data: getMedrResponse , error:getMedrResponseError} = useHttp(getData, true); 

  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "MEDR";
        sendMedrRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


    },[]);

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.sumAssured = retData.sumAssured.filter(
        (value: any) => value.age !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        sumAssured: inputdata.sumAssured.filter(
          (value: any) => value.age !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      sumAssured: inputdata.sumAssured.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any, isnumber: boolean) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      sumAssured: inputdata.sumAssured.map((val: any, ind: number) => {
        if (index === ind) {
          if (isnumber){
            val[fieldname] = Number(value);
          }
          else{
            val[fieldname] = value;
          }
                    return val;
        } else {
          return val;
        }
      }),
    }));
  };

  return (
  
    <Table striped bordered hover>
      <thead
        style={{
          backgroundColor: "rgba(71, 11, 75, 1)",
          color: "white",
          position: "sticky",
          top: "0",
        }}
      >

        <tr>
          <th>Age (Upto)</th> 
          <th>Sum Assured  (Upto)</th> 
          <th>Codes</th> 
          {(props.mode === "update" || props.mode === "create") && 
            inputdata.sumAssured?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.sumAssured || inputdata.sumAssured?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        sumAssured: [
                          {
                            age: 0,
                            sA: "",
                            codes: [],
                          },
                        ],
                      }));
                    }}
                  />
                </CustomTooltip>
              </th>
            )}
        </tr>
      </thead>
      <tbody>
        {inputdata.sumAssured?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="age"
                name="age"
                value={value.age}
                onChange={(e) =>
                  fieldChangeHandler(index, "age", e.target.value,true)
                }
                fullWidth
                size="small"
                type="number"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="sA"
                name="sA"
                value={value.sA}
                onChange={(e) =>
                  fieldChangeHandler(index, "sA", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="codes"
                name="codes"
                value={value.codes}
                onChange={(e) =>
                  fieldChangeHandler(index, "codes", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: true,
                }}
              >
                {getMedrResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.description}
                  </MenuItem>
                ))}
              </TextField>
          </td>

            {(props.mode === "update" || props.mode === "create") && (
              <td>
                <span
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "0.9rem",
                  }}
                >
                  <CustomTooltip text="Remove">
                    <DeleteIcon
                      color="error"
                      onClick={() => {
                        deleteItemHandler(index);
                      }}
                    />

                  </CustomTooltip>
                  {index === inputdata.sumAssured.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            sumAssured: [
                              ...inputdata.sumAssured,
                              {
                                age: 0,
                                sA: "",
                                codes: [],

                              },
                            ],
                          }));
                        }}
                      />
                    </CustomTooltip>
                  )}
                </span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
});
export default P0041;

