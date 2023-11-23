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

import  "./p0069.css";
import P0069Enq  from "./p0069Enq";


const P0069 = forwardRef((props: any, ref) => {

  const {sendRequest : sendP0024Request , status: getP0024ResponseStatus ,  data: getP0024Response , error:getP0024ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 
  const {sendRequest : sendLiquidfundcodeRequest , status: getLiquidfundcodeResponseStatus ,  data: getLiquidfundcodeResponse , error:getLiquidfundcodeResponseError} = useHttp(getData, true); 

  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "LIQUIDFUNDCODE";
        sendLiquidfundcodeRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.name = "P0024";
        sendP0024Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});


    },[]);

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.p0069 = retData.p0069.filter(
        (value: any) => value.months !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        p0069: inputdata.p0069.filter(
          (value: any) => value.months !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      p0069: inputdata.p0069.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any, isnumber: boolean) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      p0069: inputdata.p0069.map((val: any, ind: number) => {
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
          <th>Months</th> 
          <th>To Be Status</th> 
          <th>Sum Assured Proportion</th> 
          <th>Liquidated Ilp Fund</th> 
          <th>Recover From Fund</th> 
          <th>Liquid Fund Code</th> 
          {(props.mode === "update" || props.mode === "create") && 
            inputdata.p0069?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.p0069 || inputdata.p0069?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        p0069: [
                          {
                            months: 0,
                            toBeStatus: "",
                            saProportion: "",
                            liquidatedIlpFund: "",
                            recoverFromFund: "",
                            liquidFundCode: "",
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
        {inputdata.p0069?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="months"
                name="months"
                value={value.months}
                onChange={(e) =>
                  fieldChangeHandler(index, "months", e.target.value,true)
                }
                fullWidth
                size="small"
                type="number"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                select
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="toBeStatus"
                name="toBeStatus"
                value={value.toBeStatus}
                onChange={(e) =>
                  fieldChangeHandler(index, "toBeStatus", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              >
          {getP0024Response?.data.map((value:any) => (
            <MenuItem key={value.item} value={value.item}>
              {value.longdesc}
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
                id="saProportion"
                name="saProportion"
                value={value.saProportion}
                onChange={(e) =>
                  fieldChangeHandler(index, "saProportion", e.target.value,false)
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
                id="liquidatedIlpFund"
                name="liquidatedIlpFund"
                value={value.liquidatedIlpFund}
                onChange={(e) =>
                  fieldChangeHandler(index, "liquidatedIlpFund", e.target.value,false)
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
                id="recoverFromFund"
                name="recoverFromFund"
                value={value.recoverFromFund}
                onChange={(e) =>
                  fieldChangeHandler(index, "recoverFromFund", e.target.value,false)
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
                id="liquidFundCode"
                name="liquidFundCode"
                value={value.liquidFundCode}
                onChange={(e) =>
                  fieldChangeHandler(index, "liquidFundCode", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getLiquidfundcodeResponse?.param.data.dataPairs.map((value:any) => (
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
                  {index === inputdata.p0069.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            p0069: [
                              ...inputdata.p0069,
                              {
                                months: 0,
                                toBeStatus: "",
                                saProportion: "",
                                liquidatedIlpFund: "",
                                recoverFromFund: "",
                                liquidFundCode: "",

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


        <P0069Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0069;

