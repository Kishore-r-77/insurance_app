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

import  "./q0011.css";
import Q0011Enq  from "./q0011Enq";


const Q0011 = forwardRef((props: any, ref) => {
  const {sendRequest : sendCoverRequest , status: getCoverResponseStatus ,  data: getCoverResponse , error:getCoverResponseError} = useHttp(getData, true); 
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 
  const {sendRequest : sendBasridRequest , status: getBasridResponseStatus ,  data: getBasridResponse , error:getBasridResponseError} = useHttp(getData, true); 

  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "COVR";
        sendCoverRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "BASRID";
        sendBasridRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


    },[]);

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.coverages = retData.coverages.filter(
        (value: any) => value.coverageName !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        coverages: inputdata.coverages.filter(
          (value: any) => value.coverageName !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      coverages: inputdata.coverages.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any, isnumber: boolean) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      coverages: inputdata.coverages.map((val: any, ind: number) => {
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
          <th>Coverage Short Name</th> 
          <th>Is it Mandatory?(Y/N)</th> 
          <th>Basic or Rider(B/R)</th> 
          <th>Term can Exceed Basic(Y/N)</th> 
          <th>Premium Paying Term can Exceed Basic(Y/N)</th> 
          <th>Sum Assured can Exceed</th> 
          {(props.mode === "update" || props.mode === "create") && 
            inputdata.coverages?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.coverages || inputdata.coverages?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        coverages: [
                          {
                            coverageName: "",
                            mandatory: "",
                            basicorRider: "",
                            termCanExceed: "",
                            pptCanExceed: "",
                            saCanExceed: "",
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
        {inputdata.coverages?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
            <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="coverageName"
                name="coverageName"
                value={value.coverageName}
                onChange={(e) =>
                  fieldChangeHandler(index, "coverageName", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getCoverResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
            </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="mandatory"
                name="mandatory"
                value={value.mandatory}
                onChange={(e) =>
                  fieldChangeHandler(index, "mandatory", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
          </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="basicorRider"
                name="basicorRider"
                value={value.basicorRider}
                onChange={(e) =>
                  fieldChangeHandler(index, "basicorRider", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: true,
                }}
              >
                {getBasridResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
          </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="termCanExceed"
                name="termCanExceed"
                value={value.termCanExceed}
                onChange={(e) =>
                  fieldChangeHandler(index, "termCanExceed", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
          </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="pptCanExceed"
                name="pptCanExceed"
                value={value.pptCanExceed}
                onChange={(e) =>
                  fieldChangeHandler(index, "pptCanExceed", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
          </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="saCanExceed"
                name="saCanExceed"
                value={value.saCanExceed}
                onChange={(e) =>
                  fieldChangeHandler(index, "saCanExceed", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
                  <MenuItem key={value.code} value={value.code}>
                {value.code} - {value.description}
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
                  {index === inputdata.coverages.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            coverages: [
                              ...inputdata.coverages,
                              {
                                coverageName: "",
                                mandatory: "",
                                basicorRider: "",
                                termCanExceed: "",
                                pptCanExceed: "",
                                saCanExceed: "",

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


        <Q0011Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default Q0011;

