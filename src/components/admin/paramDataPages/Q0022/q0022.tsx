import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import "./q0022.css";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
const Q0022 = forwardRef((props: any, ref) => {
  const [inputdata, setInputdata] = useState(props.data ? props.data : {});

  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.rates = retData.rates.filter((value: any) => value.age !== "");

      setInputdata((inputdata: any) => ({
        ...inputdata,
        rates: inputdata.rates.filter((value: any) => value.age !== ""),
      }));

      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      rates: inputdata.rates.filter((_: any, ind: number) => ind !== index),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      rates: inputdata.rates.map((val: any, ind: number) => {
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
      <h1>
        {" "}
        <center>Mortality Charges (UL) </center>
      </h1>
      <thead
        style={{
          backgroundColor: "rgba(71, 11, 75, 1)",
          color: "white",
          position: "sticky",
          top: "0",
        }}
      >
        <tr>
          <th>Attained Age </th>

          <th>Premium Rates </th>

          {(props.mode === "update" || props.mode === "create") && (
            <th>ages</th>
          )}
        </tr>
      </thead>
      <tbody>
        {inputdata.rates?.map((value: any, index: number) => (
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
                  fieldChangeHandler(index, "age", e.target.value)
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
                id="rate"
                name="rate"
                value={value.rate}
                onChange={(e) =>
                  fieldChangeHandler(index, "rate", e.target.value)
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
                  {index === inputdata.rates.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            rates: [
                              ...inputdata.rates,
                              {
                                age: "",
                                rate: 0,
                                seqNo: 0,
                                glSign: "+",
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

export default Q0022;