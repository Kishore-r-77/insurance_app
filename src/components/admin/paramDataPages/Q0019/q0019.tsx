import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./q0019.css";
import Q0019Enq  from "./q0019Enq";


const Q0019 = forwardRef((props: any, ref) => {

  const {sendRequest : sendFreqRequest , status: getFreqResponseStatus ,  data: getFreqResponse , error:getFreqResponseError} = useHttp(getData, true);

  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.name =  "P0050";

        getDataParams.item = "FREQ";
        sendFreqRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


    },[]);

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.freqFactor = retData.freqFactor.filter(
        (value: any) => value.frequency !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        freqFactor: inputdata.freqFactor.filter(
          (value: any) => value.frequency !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      freqFactor: inputdata.freqFactor.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any, isnumber: boolean) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      freqFactor: inputdata.freqFactor.map((val: any, ind: number) => {
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
          <th>Frequency</th> 
          <th>Factor</th> 
          {(props.mode === "update" || props.mode === "create") && 
            inputdata.freqFactor?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.freqFactor || inputdata.freqFactor?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        freqFactor: [
                          {
                            frequency: "",
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
        {inputdata.freqFactor?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
            <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="frequency"
                name="frequency"
                value={value.frequency}
                onChange={(e) =>
                  fieldChangeHandler(index, "frequency", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getFreqResponse?.param.data.dataPairs.map((value:any) => (
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
                  {index === inputdata.freqFactor.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            freqFactor: [
                              ...inputdata.freqFactor,
                              {
                                frequency: "",
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


        <Q0019Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default Q0019;

