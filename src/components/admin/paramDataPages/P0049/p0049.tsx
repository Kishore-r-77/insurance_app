import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";

import  "./p0049.css";


const P0049 = forwardRef((props: any, ref) => {
  

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.months = retData.months.filter(
        (value: any) => value.month !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        months: inputdata.months.filter(
          (value: any) => value.month !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      months: inputdata.months.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      months: inputdata.months.map((val: any, ind: number) => {
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
          <th>Month (upto)</th> 
          <th>Percentage</th> 
          <th>Death Method</th> 
          {(props.mode === "update" || props.mode === "create") && (
            <th>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {inputdata.months?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="month"
                name="month"
                value={value.month}
                onChange={(e) =>
                  fieldChangeHandler(index, "month", e.target.value)
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
                id="percentage"
                name="percentage"
                value={value.percentage}
                onChange={(e) =>
                  fieldChangeHandler(index, "percentage", e.target.value)
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
                id="deathMethod"
                name="deathMethod"
                value={value.deathMethod}
                onChange={(e) =>
                  fieldChangeHandler(index, "deathMethod", e.target.value)
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
                  {index === inputdata.months.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            months: [
                              ...inputdata.months,
                              {
                                month: 0,
                                percentage: 0,
                                deathMethod: "",

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
export default P0049;

