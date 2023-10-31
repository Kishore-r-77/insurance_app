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

import  "./p0065.css";
import P0065Enq  from "./p0065Enq";
import Errors from "../../errors/Errors";


const P0065 = forwardRef((props: any, ref) => {
  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.fieldList = retData.fieldList.filter(
        (value: any) => value.field !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        fieldList: inputdata.fieldList.filter(
          (value: any) => value.field !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      fieldList: inputdata.fieldList.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any, isnumber: boolean) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      fieldList: inputdata.fieldList.map((val: any, ind: number) => {
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

  const [tabOpen, settabOpen] = useState(false)

  const tabopen = () =>{
    settabOpen(true)
  }

  const tableOpenFunc = (value: any, item: any) => {
    if (tabOpen) {
      value.errorCode = item.ShortCode;
    }
    settabOpen(false)
  };

  return (
    <>
    <InfoIcon
      onClick={() => enqOpen()} />
	  
    <Table striped bordered hover>
      {
        tabOpen?(<Errors modalFunc={tableOpenFunc}/>):null
      }

      <thead
        style={{
          backgroundColor: "rgba(71, 11, 75, 1)",
          color: "white",
          position: "sticky",
          top: "0",
        }}
      >

        <tr>
          <th>Field</th> 
          <th>Error Code</th> 
          {(props.mode === "update" || props.mode === "create") && 
            inputdata.fieldList?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.fieldList || inputdata.fieldList?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        fieldList: [
                          {
                            field: "",
                            errorCode: "",
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
        {inputdata.fieldList?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="field"
                name="field"
                value={value.field}
                onChange={(e) =>
                  fieldChangeHandler(index, "field", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              />
            </td>

            <td>
              {/* <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="errorCode"
                name="errorCode"
                value={value.errorCode}
                onChange={(e) =>
                  fieldChangeHandler(index, "errorCode", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              /> */}
              <TextField
                    //InputProps={{ readOnly: true }}
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                  }}
                    id="errorCode"
                    name="errorCode"
                    // placeholder="Error Code"
                    // label="Error Code"
                    // Attention: *** Check the value details  ***
                    onClick={tabopen}
                    value={value.errorCode}
                    onChange={(e) =>
                      fieldChangeHandler(index, "errorCode", e.target.value,false)
                    }
                    fullWidth
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
                  {index === inputdata.fieldList.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            fieldList: [
                              ...inputdata.fieldList,
                              {
                                field: "",
                                errorCode: "",

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


        <P0065Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0065;

