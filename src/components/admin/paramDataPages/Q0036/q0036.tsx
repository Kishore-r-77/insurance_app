import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";

import  "./q0036.css";


const Q0036 = forwardRef((props: any, ref) => {
  

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.stampDuties = retData.stampDuties.filter(
        (value: any) => value.sA !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        stampDuties: inputdata.stampDuties.filter(
          (value: any) => value.sA !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      stampDuties: inputdata.stampDuties.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      stampDuties: inputdata.stampDuties.map((val: any, ind: number) => {
        if (index === ind) {
          val[fieldname] = value;
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
          <th>SA</th> 
          <th>Rate</th> 
          {(props.mode === "update" || props.mode === "create") && (
            <th>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {inputdata.stampDuties?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="sA"
                name="sA"
                value={value.sA}
                onChange={(e) =>
                  fieldChangeHandler(index, "sA", e.target.value)
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
                id="rate"
                name="rate"
                value={value.rate}
                onChange={(e) =>
                  fieldChangeHandler(index, "rate", e.target.value)
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
                  {index === inputdata.stampDuties.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            stampDuties: [
                              ...inputdata.stampDuties,
                              {
                                sA: 0,
                                rate: 0,

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
export default Q0036;

