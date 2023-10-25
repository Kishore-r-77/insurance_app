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

import  "./p0066.css";
import P0066Enq  from "./p0066Enq";


const P0066 = forwardRef((props: any, ref) => {
  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.fieldList = retData.fieldList.filter(
        (value: any) => value.name !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        fieldList: inputdata.fieldList.filter(
          (value: any) => value.name !== ""
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
          <th>Name</th> 
          <th>Dial Code</th> 
          <th>Code</th> 
          <th>Flag</th> 
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
                            name: "",
                            dialCode: "",
                            code: "",
                            flag: "",
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
                id="name"
                name="name"
                value={value.name}
                onChange={(e) =>
                  fieldChangeHandler(index, "name", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="dialCode"
                name="dialCode"
                value={value.dialCode}
                onChange={(e) =>
                  fieldChangeHandler(index, "dialCode", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="code"
                name="code"
                value={value.code}
                onChange={(e) =>
                  fieldChangeHandler(index, "code", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="flag"
                name="flag"
                value={value.flag}
                onChange={(e) =>
                  fieldChangeHandler(index, "flag", e.target.value,false)
                }
                fullWidth
                size="small"
                type="text"
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
                                name: "",
                                dialCode: "",
                                code: "",
                                flag: "",

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


        <P0066Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0066;

