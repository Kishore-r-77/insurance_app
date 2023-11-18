import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText, Autocomplete, Box, Paper } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import axios from "axios";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0068.css";
import P0068Enq  from "./p0068Enq";


const P0068 = forwardRef((props: any, ref) => {

  const {sendRequest : sendP0068BasisRequest , status: getP0068BasisResponseStatus ,  data: getP0068BasisResponse , error:getP0068BasisResponseError} = useHttp(getData, true); 

  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "P0068BASIS";
        sendP0068BasisRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


    },[]);

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.rangeArray = retData.rangeArray.filter(
        (value: any) => value.p0068Basis !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        rangeArray: inputdata.rangeArray.filter(
          (value: any) => value.p0068Basis !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      rangeArray: inputdata.rangeArray.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any, isnumber: boolean) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      rangeArray: inputdata.rangeArray.map((val: any, ind: number) => {
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

  const [enq, setEnq] = useState(false)

  const enqOpen = () =>{
    setEnq(true)
  }

  const enqClose = () =>{
    setEnq(false)
  }

  return (
    <>
    <InfoIcon
      onClick={() => enqOpen()} />
	  
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
          <th>Calculation Basis</th> 
          <th>Age</th> 
          <th>From Sum Assured</th> 
          <th>To Sum Assured</th> 
          <th>Multiplication Factor</th> 
          {(props.mode === "update" || props.mode === "create") && 
            inputdata.rangeArray?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.rangeArray || inputdata.rangeArray?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        rangeArray: [
                          {
                            p0068Basis: "",
                            age: 0,
                            fromSA: 0,
                            toSA: 0,
                            factor: 0,
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
        {inputdata.rangeArray?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="p0068Basis"
                name="p0068Basis"
                value={value.p0068Basis}
                onChange={(e) =>
                  fieldChangeHandler(index, "p0068Basis", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getP0068BasisResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
          </td>

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
                readOnly: props.mode === "display" || props.mode === "delete" || value.p0068Basis == 'M',
                }}
                id="fromSA"
                name="fromSA"
                value={value.fromSA}
                onChange={(e) =>
                  fieldChangeHandler(index, "fromSA", e.target.value,true)
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
                readOnly: props.mode === "display" || props.mode === "delete" || value.p0068Basis == 'M',
                }}
                id="toSA"
                name="toSA"
                value={value.toSA}
                onChange={(e) =>
                  fieldChangeHandler(index, "toSA", e.target.value,true)
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
                readOnly: props.mode === "display" || props.mode === "delete" || value.p0068Basis == 'R',
                }}
                id="factor"
                name="factor"
                value={value.factor}
                onChange={(e) =>
                  fieldChangeHandler(index, "factor", e.target.value,true)
                }
                fullWidth
                size="small"
                type="number"
                margin="dense"
              />
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
                  {index === inputdata.rangeArray.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            rangeArray: [
                              ...inputdata.rangeArray,
                              {
                                p0068Basis: "",
                                age: 0,
                                fromSA: 0,
                                toSA: 0,
                                factor: 0,

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


        <P0068Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0068;

